# Utiliser une image Python officielle
FROM python:3.9

# Installer les dépendances système nécessaires à Selenium, Chrome et OpenCV
RUN apt-get update && apt-get install -y \
    python3 python3-pip \
    libgl1-mesa-glx libglib2.0-0 \
    wget unzip curl

# Télécharger et installer une version STABLE de Google Chrome (ex: v119)
RUN wget -q -O /tmp/google-chrome.deb https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_119.0.6045.123-1_amd64.deb && \
    apt-get install -y /tmp/google-chrome.deb && \
    rm /tmp/google-chrome.deb

# Installer la version correspondante de ChromeDriver (v119)
RUN wget -O /tmp/chromedriver.zip https://chromedriver.storage.googleapis.com/119.0.6045.123/chromedriver_linux64.zip && \
    unzip /tmp/chromedriver.zip -d /usr/local/bin/ && \
    rm /tmp/chromedriver.zip

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet dans le conteneur
COPY requirements.txt /app/
COPY src/ /app/src/

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Exposer le port 8000 pour FastAPI
EXPOSE 8000

# Lancer FastAPI
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
