from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import threading
from pydantic import BaseModel
from src.captchaSolverAutoV2 import CaptchaAutomation

# Création de l'API FastAPI
app = FastAPI()

# Configuration des CORS pour autoriser le frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 🔥 Autorise toutes les origines (à restreindre si besoin)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modèle de requête
class CaptchaRequest(BaseModel):
    """Modèle pour recevoir la requête avec l'URL du site."""
    url: str

def run_solver(url):
    """Lance le solveur de CAPTCHA en arrière-plan avec gestion des erreurs."""
    try:
        bot = CaptchaAutomation(url)
        bot.solve_captcha()
        print(f"✅ CAPTCHA résolu pour : {url}")
    except Exception as e:
        print(f"❌ Erreur dans le solveur CAPTCHA : {e}")

@app.post("/solve")
def solve_captcha(request: CaptchaRequest):
    """API pour déclencher la résolution du CAPTCHA."""
    try:
        thread = threading.Thread(target=run_solver, args=(request.url,))
        thread.daemon = True  # 🔥 Assure que le thread se ferme proprement
        thread.start()
        return {"status": "Solving started", "url": request.url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors du lancement du solveur : {e}")
