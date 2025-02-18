from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import numpy as np
import cv2
from PIL import Image
import io
import os

from transformers import TrOCRProcessor, VisionEncoderDecoderModel


class CaptchaSolverSelenium:
    #Classe pour récupérer un CAPTCHA à partir d'un site web avec Selenium.

    def __init__(self, url, captcha_id="demoCaptcha_CaptchaImage", output_folder="../data/"):
        self.url = url
        self.captcha_id = captcha_id
        self.output_folder = output_folder
        self.driver = None

        # Créer un dossier data si il existe pas
        os.makedirs(self.output_folder, exist_ok=True)

    def capture_captcha(self):
        #Capture et sauvegarde le CAPTCHA dans data
        self.driver = webdriver.Chrome()
        self.driver.get(self.url) #get l'url

        try:
            # Attendre le CAPTCHA
            captcha_element = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.ID, self.captcha_id))
            )

            # Vérifier que l'élément a une taille correcte
            WebDriverWait(self.driver, 10).until(
                lambda d: captcha_element.size["width"] > 10 and captcha_element.size["height"] > 10
            )

            # Capturer le CAPTCHA
            captcha_bytes = captcha_element.screenshot_as_png#capture l'élément en png
            captcha_path = os.path.join(self.output_folder, "captcha.png") # en registre le captcha dans le data sous le nom cpatcha.png

            # ouvre le fichier en binaire et écrit les données de l'image dedans
            with open(captcha_path, "wb") as f:
                f.write(captcha_bytes)

            print(f"✅ CAPTCHA capturé et sauvegardé : {captcha_path}")
            return captcha_path

        except Exception as e:
            print(f"❌ Erreur lors de la capture du CAPTCHA : {e}")
            return None
        
    #fonction pour fermer le navigateur a la fin
    def close(self):
        if self.driver:
            self.driver.quit()


class CaptchaReaderTrOCR:
    #Classe pour lire un CAPTCHA en utilisant le model TrOCR

    def __init__(self, data_folder="../data/"):
        self.data_folder = data_folder
        self.processor = TrOCRProcessor.from_pretrained("microsoft/trocr-base-handwritten", use_fast=True)# Chargement du proco TrOCR pour préparer les images
        self.model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-handwritten", ignore_mismatched_sizes=True)# chargement modèle TrOCR

    def read_captcha(self):
        #fonction pour lire le CAPTCHA sauvegardé et retourne le texte détecté
        captcha_path = os.path.join(self.data_folder, "captcha.png")

        try:
            image = Image.open(captcha_path).convert("RGB")#ouvre l'image en modifiant le rgb pour une meilleur lecture
            pixel_values = self.processor(images=image, return_tensors="pt").pixel_values
            generated_ids = self.model.generate(pixel_values)# génère du texte prédit par le modèle
            text = self.processor.batch_decode(generated_ids, skip_special_tokens=True)[0]

            print(f"🔍 CAPTCHA détecté : {text}")
            return text

        except Exception as e:
            print(f"❌ Erreur lors de la lecture du CAPTCHA : {e}")
            return None


class CaptchaAutomation:
    #Classe principale pour capturer et résoudre le CAPTCHA automatiquement

    def __init__(self, url):
        self.url = url
        self.solver = CaptchaSolverSelenium(url, output_folder="../data/")# initialise un solveur de captcha
        self.reader = CaptchaReaderTrOCR(data_folder="../data/")# initialise un lecteur de captcha

    def solve_captcha(self):
        #Automatise la capture et la résolution du CAPTCHA
        # Capture du CAPTCHA
        captcha_path = self.solver.capture_captcha()
        if not captcha_path:
            print("❌ Impossible de capturer le CAPTCHA.")
            return

        # Lecture du CAPTCHA
        captcha_text = self.reader.read_captcha()
        if not captcha_text:
            print("❌ Impossible de lire le CAPTCHA.")
            return

        # Remplir le champ d'entrée
        try:
            input_field = WebDriverWait(self.solver.driver, 10).until(
                EC.presence_of_element_located((By.ID, "captchaCode"))
            )
            input_field.send_keys(captcha_text)
            input_field.send_keys(Keys.RETURN)

            print("✅ CAPTCHA soumis avec succès.")
            time.sleep(2)

        except Exception as e:
            print(f"❌ Erreur lors de la soumission du CAPTCHA : {e}")

        finally:
            time.sleep(10)
            self.solver.close()


if __name__ == "__main__":
    URL = "https://captcha.com/demos/features/captcha-demo.aspx"
    bot = CaptchaAutomation(URL)
    bot.solve_captcha()

    # captcha_path = bot.solver.capture_captcha()
    # captchaReader = bot.reader.read_captcha()
    # if captchaReader:
    #     print(f"résultat du captcha : {captchaReader}")
    # else:
    #     print("cringe")
