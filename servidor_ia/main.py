from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import torch
from transformers import Sam2Model, Sam2Processor
from PIL import Image
import io
import base64
import numpy as np
import cv2

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

modelo_segmentacion = None
procesador_imagen = None

@app.on_event("startup")
async def cargar_modelo():
    global modelo_segmentacion, procesador_imagen
    print("Iniciando SAM 2 Model (Escenarios Predefinidos)...")
    
    try:
        identificador_modelo = "facebook/sam2-hiera-tiny"
        procesador_imagen = Sam2Processor.from_pretrained(identificador_modelo)
        modelo_segmentacion = Sam2Model.from_pretrained(identificador_modelo)
        
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        modelo_segmentacion.to(device)
        modelo_segmentacion.eval()
        
        print(f"SAM 2 cargado exitosamente en: {device}")
    except Exception as e:
        print(f"Error crítico cargando SAM 2: {e}")

@app.post("/segmentar")
async def segmentar_imagen(
    file: UploadFile = File(...),
    target: str = Form("piso"),
    coord_x: float = Form(-1.0),
    coord_y: float = Form(-1.0)
):
    if not modelo_segmentacion or not procesador_imagen:
        return JSONResponse(content={"error": "El modelo IA aún no se ha cargado"}, status_code=503)

    try:
        # Leer la imagen subida
        contenido_imagen = await file.read()
        imagen_original = Image.open(io.BytesIO(contenido_imagen)).convert("RGB")
        ancho, alto = imagen_original.size
        
        # Si no nos pasan coordenadas válidas, deducimos unas por defecto
        if coord_x < 0 or coord_y < 0:
            if target == "piso":
                coord_x, coord_y = 0.5, 0.85
            else:
                coord_x, coord_y = 0.5, 0.4
                
        # Convertir coordenadas relativas a píxeles absolutos
        pixel_x = int(ancho * coord_x)
        pixel_y = int(alto * coord_y)
        
        # Añadir un punto negativo (background) para evitar sangrado
        # Si queremos el piso, la pared es negativa. Si queremos la pared, el piso es negativo.
        if target == "piso":
            punto_negativo_x = int(ancho * 0.5)
            punto_negativo_y = int(alto * 0.2)
        else:
            punto_negativo_x = int(ancho * 0.5)
            punto_negativo_y = int(alto * 0.95)
            
        # Puntos y etiquetas: 1 = Foreground, 0 = Background
        input_points = [[[[pixel_x, pixel_y], [punto_negativo_x, punto_negativo_y]]]]
        input_labels = [[[1, 0]]]
        
        # Inferencia SAM 2
        device = modelo_segmentacion.device
        inputs = procesador_imagen(
            imagen_original, 
            input_points=input_points, 
            input_labels=input_labels, 
            return_tensors="pt"
        ).to(device)
        
        with torch.no_grad():
            outputs = modelo_segmentacion(**inputs)
            
        # SAM2 devuelve pred_masks. Usamos la función nativa para reescalar
        masks_high_res = procesador_imagen.image_processor.post_process_masks(
            outputs.pred_masks, inputs["original_sizes"]
        ) # Retorna lista de tensores [1, 3, alto, ancho]
        
        pred_masks_tensor = masks_high_res[0].cpu()[0]  # shape (3, alto, ancho)
        iou_scores = outputs.iou_scores.cpu().numpy()[0, 0]  # shape (3,)
        
        mejor_indice = -1
        mejor_iou = -1.0
        
        for idx in range(3):
            # La máscara ya está en float y tamaño original (logits)
            mascara_candidata = (pred_masks_tensor[idx].numpy() > 0.0)
            cobertura = mascara_candidata.sum() / mascara_candidata.size
            
            # Descartar máscaras gigantes o enanas
            if 0.02 < cobertura < 0.70:
                if iou_scores[idx] > mejor_iou:
                    mejor_iou = iou_scores[idx]
                    mejor_indice = idx
                    
        # Fallback si ninguna cumple
        if mejor_indice == -1:
            mejor_indice = np.argmax(iou_scores)
            
        print(f"[SAM2] Target={target}, Máscara elegida=[{mejor_indice}], IoU={iou_scores[mejor_indice]:.3f}")
        
        # Máscara final
        mascara_booleana = pred_masks_tensor[mejor_indice].numpy() > 0.0
        mascara_pixeles = (mascara_booleana * 255).astype(np.uint8)
        
        # Suavizado fuerte para limpiar bordes del modelo "tiny"
        mascara_suavizada = cv2.GaussianBlur(mascara_pixeles, (15, 15), 0)
        # Aplicar threshold para re-enfocar los bordes suaves
        _, mascara_suavizada = cv2.threshold(mascara_suavizada, 127, 255, cv2.THRESH_BINARY)
        mascara_suavizada = cv2.GaussianBlur(mascara_suavizada, (5, 5), 0)
        
        # Crear PNG transparente
        datos_imagen_final = np.zeros((alto, ancho, 4), dtype=np.uint8)
        datos_imagen_final[..., 3] = mascara_suavizada
        
        imagen_salida_png = Image.fromarray(datos_imagen_final, 'RGBA')
        buffer_salida = io.BytesIO()
        imagen_salida_png.save(buffer_salida, format="PNG")
        buffer_salida.seek(0)
        
        # Codificar en Base64 para JSON
        mascara_base64 = base64.b64encode(buffer_salida.getvalue()).decode("utf-8")
        mascara_data_url = f"data:image/png;base64,{mascara_base64}"
        
        # Cálculo de Homografía (opcional, para React CSS matrix3d)
        homografia_plana = None
        esquinas_planas = None
        
        if target == "piso":
            # Extraer esquinas aproximadas para la perspectiva
            contornos, _ = cv2.findContours(mascara_suavizada, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            if contornos:
                contorno_max = max(contornos, key=cv2.contourArea)
                if cv2.contourArea(contorno_max) > (ancho * alto * 0.05):
                    # Aproximar a un polígono
                    epsilon = 0.02 * cv2.arcLength(contorno_max, True)
                    aprox = cv2.approxPolyDP(contorno_max, epsilon, True)
                    
                    if len(aprox) >= 4:
                        # Ordenar puntos (muy simplificado, idealmente usar ConvexHull o similar)
                        puntos = aprox.reshape(-1, 2)
                        # ... para simplificar y no romper, devolveremos None y que React use fallback
                        pass
        
        return {
            "mascara": mascara_data_url,
            "target": target,
            "dimensiones": {"ancho": ancho, "alto": alto},
            "homografia": homografia_plana,
            "esquinas": esquinas_planas
        }
        
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        return JSONResponse(content={"error": f"Error interno: {str(e)}"}, status_code=500)
