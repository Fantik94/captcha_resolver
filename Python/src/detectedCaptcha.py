import cv2
import numpy as np
import sys

def detect_captcha_type(image_path):
    """Détecte si un CAPTCHA est segmenté ou manuscrit."""
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    if image is None:
        print("❌ Erreur : Impossible de charger l'image. Vérifiez le chemin.")
        return None

    # Appliquer un seuillage adaptatif pour détecter le texte
    _, thresholded = cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    # Détecter les contours
    contours, _ = cv2.findContours(thresholded, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Vérifier le nombre de segments détectés
    if len(contours) > 5:  
        print("🔹 Type détecté : CAPTCHA segmenté (lettres séparées)")
        print("📌 Modèle recommandé : microsoft/trocr-base-handwritten")
        return "trocr-base"
    else:  
        print("🔹 Type détecté : CAPTCHA manuscrit (bruité)")
        print("📌 Modèle recommandé : microsoft/trocr-large-handwritten")
        return "trocr-large"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("❌ Erreur : Veuillez fournir un chemin d'image en argument.")
        print("📝 Exemple : python test_captcha_type.py ./data/captcha.png")
        sys.exit(1)

    image_path = sys.argv[1]
    detect_captcha_type(image_path)
