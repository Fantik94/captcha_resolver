import tensorflow as tf
print("✅ TensorFlow fonctionne ! Version:", tf.__version__)
model_path = "/Users/romaincascio/.cache/huggingface/hub/models--keras-io--ocr-for-captcha/snapshots/1d695c4be3c72166292ff61c361d47c96f43cb7f"

# Charger le modèle
loaded_model = tf.saved_model.load(model_path)

# Vérifier les signatures disponibles
print("📌 Signatures du modèle :", list(loaded_model.signatures.keys()))
