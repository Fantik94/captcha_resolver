# Utiliser une image Python officielle
FROM python:3.9

# Installer les dépendances système nécessaires à OpenCV
RUN apt-get update && apt-get install -y python3 python3-pip libgl1-mesa-glx libglib2.0-0

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet dans le conteneur
COPY requirements.txt /app/
COPY src/ /app/src/

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Exposer le port 8000
EXPOSE 8000

# Exécuter FastAPI
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
