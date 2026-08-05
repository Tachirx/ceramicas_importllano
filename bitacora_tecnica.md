# Bitácora Técnica - Simulador Importllano

Este documento registra las decisiones arquitectónicas, experimentos y pivotes tecnológicos realizados durante el desarrollo del Simulador de Cerámicas Importllano.

## Historial de Fases de Inteligencia Artificial

### Fase 1: Client-Side AI (Inferencia en Navegador)
*   **Tecnología:** `@xenova/transformers` (WebAssembly), React.
*   **Modelo:** `Xenova/segformer-b0-finetuned-ade-512-512` (32MB).
*   **Ventaja:** Costo de servidor $0.00. Alta velocidad. No requiere internet rápido.
*   **Motivo de Abandono:** La resolución de 512x512 causaba bordes "de serrucho" (pixelados) al escalar la máscara a la resolución de la fotografía. Falla de fotorrealismo en contornos complejos (bañeras, toallas).

### Fase 2: Edge Computing / Servidor Intranet Local
*   **Tecnología:** Python, FastAPI, PyTorch, OpenCV.
*   **Modelos Probados:** 
    1. `nvidia/segformer-b5-finetuned-ade-640-640` (Segmentación Semántica de alta precisión).
    2. `facebook/sam-vit-base` (Segment Anything Model - Precisión quirúrgica de píxel perfecto).
*   **Ventaja:** Resultados visuales perfectos, sin costo de API en la nube (alojado en la PC de la tienda).
*   **Motivo de Abandono:** Sobrecarga extrema del sistema. Requería descargar gigabytes de pesos neuronales. La inestabilidad del entorno local provocaba reinicios del servidor por consumo de memoria RAM. Arquitectura excesivamente compleja para mantener a largo plazo.

### Fase 3: Integración Comercial de Terceros (Roomvo) - [ACTUAL]
*   **Tecnología:** Iframe / Widget JS Integrado (`RoomvoWidget.tsx`).
*   **Descripción:** Abandono completo de la IA propia (se eliminó el servidor Python y el cliente Xenova). El cotizador de React en la columna derecha se mantiene, pero la columna izquierda delega la visualización al servicio comercial Roomvo.
*   **Ventaja:** Estabilidad absoluta. Fotorrealismo comercial de nivel industrial. Cero mantenimiento de servidores.
*   **Limitación Identificada:** Solo se pueden visualizar pisos de fabricantes que paguen la licencia corporativa a Roomvo (ej. Cerámicas Caribe, ITACA, Palo Rosa). Marcas regionales (ej. Americer) que no estén en la base de datos de Roomvo no podrán ser visualizadas a menos que Importllano adquiera una licencia costosa como fabricante.

## Estado Actual del Proyecto
- Cotizador y Métricas PBR funcionales (React + Tailwind).
- Flujo de cotización UI/UX estable.
- Componente `VisualizadorIA.tsx` y motor de IA eliminados para reducir peso del proyecto.
- Se implementó `RoomvoWidget.tsx` como pasarela a la herramienta B2B.