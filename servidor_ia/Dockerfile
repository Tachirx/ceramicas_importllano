# Usamos una imagen de Python ligera pero completa
FROM python:3.10-slim

# Evitar que Python escriba archivos .pyc y forzar logs sin buffer
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Crear directorio de trabajo
WORKDIR /app

# Copiar el archivo de dependencias primero para cachear la capa de Docker
COPY requirements.txt .

# Instalar dependencias
# Nota: Instalamos PyTorch en versión CPU (especificado en requirements.txt) para ahorrar Gb de espacio
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código fuente
COPY . .

# Comando de arranque (usa la variable $PORT que inyecta Render dinámicamente)
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
