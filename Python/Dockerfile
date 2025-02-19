# Utiliser une image Python officielle
FROM python:3.9

# Installer les dépendances système
RUN apt-get update && apt-get install -y python3 python3-pip

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires dans le conteneur
COPY requirements.txt /app/
COPY src/ /app/src/

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Lancer FastAPI au démarrage du container
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
