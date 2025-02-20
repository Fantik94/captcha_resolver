from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from PIL import Image
import time
import os
import requests
import torch
from transformers import TrOCRProcessor, VisionEncoderDecoderModel

class CaptchaSolverSelenium:
    """Classe pour récupérer un CAPTCHA à partir d'un site web déjà ouvert."""

    def __init__(self, captcha_id="captcha-img", output_folder="./data/"):
        self.captcha_id = captcha_id
        self.output_folder = output_folder
        self.driver = None

        # Créer le dossier ./data/ s'il n'existe pas
        os.makedirs(self.output_folder, exist_ok=True)

    def connect_to_existing_chrome(self):
        """Se connecte à Chrome déjà ouvert"""
        chrome_options = webdriver.ChromeOptions()
        chrome_options.debugger_address = "localhost:9222"  # 🔥 Se connecte à Chrome déjà ouvert
        self.driver = webdriver.Chrome(options=chrome_options)

    def capture_captcha(self):
        """Télécharge directement l’image du CAPTCHA depuis son URL"""
        try:
            if not self.driver:
                self.connect_to_existing_chrome()

            print("📡 Selenium est bien connecté à Chrome !")
            print(f"🔍 URL actuelle dans Selenium : {self.driver.current_url}")

            # Récupérer l’élément du CAPTCHA
            time.sleep(2)
            captcha_element = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.ID, self.captcha_id))
            )

            # Récupérer l’URL du CAPTCHA
            captcha_url = captcha_element.get_attribute("src")
            print(f"📌 URL du CAPTCHA : {captcha_url}")

            if not captcha_url:
                print("❌ Impossible de récupérer l’URL du CAPTCHA.")
                return None

            # Télécharger l’image
            response = requests.get(captcha_url, stream=True)
            if response.status_code == 200:
                captcha_path = os.path.join(self.output_folder, "captcha.png")
                with open(captcha_path, "wb") as f:
                    for chunk in response.iter_content(1024):
                        f.write(chunk)
                print(f"✅ CAPTCHA téléchargé et sauvegardé : {captcha_path}")
                return captcha_path
            else:
                print(f"❌ Échec du téléchargement du CAPTCHA. Code HTTP : {response.status_code}")
                return None

        except Exception as e:
            print(f"❌ Erreur lors de la récupération du CAPTCHA : {e}")
            return None

    # Fonction pour fermer le navigateur proprement
    def close(self):
        if self.driver:
            self.driver.quit()


class CaptchaReaderTrOCR:
    """Classe pour lire un CAPTCHA en utilisant le modèle DunnBC22/trocr-base-printed_captcha_ocr."""

    def __init__(self, data_folder="./data/"):
        self.data_folder = data_folder
        self.device = "cuda" if torch.cuda.is_available() else "cpu"

        try:
            self.processor = TrOCRProcessor.from_pretrained("microsoft/trocr-base-printed")#nouveau model + adapté au style de captcha
            self.model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-printed")

            self.model.to(self.device)
            print("✅ Modèle chargé avec succès !")
        except Exception as e:
            print(f"❌ Erreur lors du chargement du modèle : {e}")
            raise

    def preprocess_image(self, image_path):
        """Améliore le prétraitement de l'image avant la prédiction."""
        img = Image.open(image_path).convert("RGB")
        img = img.resize((300, 100))  # Normalisation de la taille
        return img

    def read_captcha(self):
        """Lit le CAPTCHA sauvegardé et retourne le texte détecté."""
        captcha_path = os.path.join(self.data_folder, "captcha.png")

        try:
            image = self.preprocess_image(captcha_path)
            pixel_values = self.processor(images=image, return_tensors="pt").pixel_values.to(self.device)

            # Génération de texte
            generated_ids = self.model.generate(pixel_values)
            text = self.processor.batch_decode(generated_ids, skip_special_tokens=True)[0]

            print(f"🔍 CAPTCHA détecté : {text}")
            return text

        except Exception as e:
            print(f"❌ Erreur lors de la lecture du CAPTCHA : {e}")
            return None


class CaptchaAutomation:
    """Classe principale pour capturer et résoudre le CAPTCHA automatiquement"""

    def __init__(self, url):
        self.url = url
        self.solver = CaptchaSolverSelenium(captcha_id="captcha-img", output_folder="./data/")
        self.reader = None  # Initialisé après la capture

    def solve_captcha(self):
        """Automatise la capture et la résolution du CAPTCHA"""
        # Capture du CAPTCHA
        captcha_path = self.solver.capture_captcha()
        if not captcha_path:
            print("❌ Impossible de capturer le CAPTCHA.")
            return

        # Initialiser le lecteur
        try:
            self.reader = CaptchaReaderTrOCR(data_folder="./data/")
        except Exception as e:
            print(f"❌ Échec de l'initialisation de CaptchaReaderTrOCR : {e}")
            return
        
        # Lecture du CAPTCHA
        captcha_text = self.reader.read_captcha()
        if not captcha_text:
            print("❌ Impossible de lire le CAPTCHA.")
            return

        # Remplir le champ d'entrée
        try:
            input_field = WebDriverWait(self.solver.driver, 10).until(
                EC.presence_of_element_located((By.ID, "captcha-input"))
            )
            input_field.send_keys(captcha_text)
            time.sleep(3)
            input_field.send_keys(Keys.RETURN)

            print("✅ CAPTCHA soumis avec succès.")
            time.sleep(2)

        except Exception as e:
            print(f"❌ Erreur lors de la soumission du CAPTCHA : {e}")

        finally:
            time.sleep(5)
            self.solver.close()


# if __name__ == "__main__":
    # URL = "http://localhost:3000"
    # bot = CaptchaAutomation(URL)
    # bot.solve_captcha()
