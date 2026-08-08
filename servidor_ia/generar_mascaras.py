import os
import torch
import numpy as np
from PIL import Image
from transformers import SegformerImageProcessor, AutoModelForSemanticSegmentation

# Rutas de las imágenes
base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'public', 'plantillas'))
imagenes = ['sala.jpg', 'bano.jpg', 'cocina.jpg']

print("Cargando el modelo SegFormer (State-of-the-Art en segmentación de interiores)...")
processor = SegformerImageProcessor.from_pretrained("nvidia/segformer-b0-finetuned-ade-512-512")
model = AutoModelForSemanticSegmentation.from_pretrained("nvidia/segformer-b0-finetuned-ade-512-512")

# Buscar los IDs de las clases 'floor' y 'wall'
wall_id = None
floor_id = None
for id, label in model.config.id2label.items():
    if 'wall' in label.lower() and wall_id is None:
        wall_id = id
    if 'floor' in label.lower() and floor_id is None:
        floor_id = id

print(f"IDs detectados - Piso: {floor_id}, Pared: {wall_id}")

for img_name in imagenes:
    img_path = os.path.join(base_dir, img_name)
    if not os.path.exists(img_path):
        print(f"Imagen no encontrada: {img_path}")
        continue
    
    print(f"Procesando {img_name}...")
    image = Image.open(img_path).convert("RGB")
    
    # Preparar la imagen para el modelo
    inputs = processor(images=image, return_tensors="pt")
    
    # Inferencia
    with torch.no_grad():
        outputs = model(**inputs)
        
    # Redimensionar los logits al tamaño original de la imagen
    logits = outputs.logits
    upsampled_logits = torch.nn.functional.interpolate(
        logits,
        size=image.size[::-1], # (height, width)
        mode="bilinear",
        align_corners=False,
    )
    
    # Obtener la clase predicha para cada píxel
    pred_seg = upsampled_logits.argmax(dim=1)[0].cpu().numpy()
    
    # Crear máscara de piso (RGBA con transparencia)
    floor_alpha = (pred_seg == floor_id).astype(np.uint8) * 255
    floor_rgba = np.zeros((floor_alpha.shape[0], floor_alpha.shape[1], 4), dtype=np.uint8)
    floor_rgba[:, :, 3] = floor_alpha # Alpha
    floor_rgba[:, :, 0:3] = 255 # White color
    floor_img = Image.fromarray(floor_rgba, mode='RGBA')
    floor_img_path = os.path.join(base_dir, img_name.replace('.jpg', '-mask-piso.png'))
    floor_img.save(floor_img_path)
    
    # Crear máscara de pared (RGBA con transparencia)
    wall_alpha = (pred_seg == wall_id).astype(np.uint8) * 255
    wall_rgba = np.zeros((wall_alpha.shape[0], wall_alpha.shape[1], 4), dtype=np.uint8)
    wall_rgba[:, :, 3] = wall_alpha # Alpha
    wall_rgba[:, :, 0:3] = 255 # White color
    wall_img = Image.fromarray(wall_rgba, mode='RGBA')
    wall_img_path = os.path.join(base_dir, img_name.replace('.jpg', '-mask-pared.png'))
    wall_img.save(wall_img_path)
    
    print(f"  -> Guardadas máscaras para {img_name}")

print("¡Proceso de segmentación semántica completado con éxito!")
