"""
Script de diagnóstico para inspeccionar las dimensiones exactas
de la salida de SAM 2 y elegir la máscara correcta.
"""
import torch
from transformers import Sam2Model, Sam2Processor
from PIL import Image
import numpy as np

print("=== DIAGNÓSTICO SAM 2 ===")

procesador = Sam2Processor.from_pretrained("facebook/sam2-hiera-tiny")
modelo = Sam2Model.from_pretrained("facebook/sam2-hiera-tiny")
modelo.eval()

# Crear imagen de prueba con dimensiones realistas
img = Image.fromarray(np.random.randint(0, 255, (800, 1200, 3), dtype=np.uint8))
ancho, alto = img.size
print(f"Imagen de entrada: {ancho}x{alto}")

# Punto de prueba: centro-inferior (simula piso)
pixel_x = int(ancho * 0.5)
pixel_y = int(alto * 0.85)
punto = [[[[pixel_x, pixel_y]]]]

inputs = procesador(img, input_points=punto, return_tensors="pt")
print(f"\nClaves del input: {list(inputs.keys())}")
print(f"pixel_values shape: {inputs['pixel_values'].shape}")
print(f"original_sizes: {inputs['original_sizes']}")

with torch.no_grad():
    outputs = modelo(**inputs)

print(f"\nClaves del output: {list(outputs.keys())}")
print(f"pred_masks shape: {outputs.pred_masks.shape}")

if hasattr(outputs, 'iou_scores'):
    print(f"iou_scores shape: {outputs.iou_scores.shape}")
    print(f"iou_scores values: {outputs.iou_scores}")

pred_masks = outputs.pred_masks.cpu().numpy()
print(f"\npred_masks ndim: {pred_masks.ndim}")
print(f"pred_masks dtype: {pred_masks.dtype}")
print(f"pred_masks min/max: {pred_masks.min():.4f} / {pred_masks.max():.4f}")

# Inspeccionar cada dimensión
for i in range(pred_masks.ndim):
    print(f"  dim[{i}] size = {pred_masks.shape[i]}")

# Probar a extraer cada máscara candidata
num_masks = pred_masks.shape[2] if pred_masks.ndim == 5 else pred_masks.shape[1]
print(f"\nNúmero de máscaras candidatas: {num_masks}")

for m_idx in range(min(num_masks, 4)):
    if pred_masks.ndim == 5:
        mascara = pred_masks[0, 0, m_idx, :, :]
    else:
        mascara = pred_masks[0, m_idx, :, :]
    
    cobertura = (mascara > 0).sum() / mascara.size * 100
    print(f"  Máscara [{m_idx}]: shape={mascara.shape}, cobertura={cobertura:.1f}%, min={mascara.min():.2f}, max={mascara.max():.2f}")

print("\n=== FIN DIAGNÓSTICO ===")
