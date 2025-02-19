from fastapi import FastAPI
import threading
from pydantic import BaseModel
from captchaSolverAutoV2 import CaptchaAutomation

# Création de l'API FastAPI
app = FastAPI()

class CaptchaRequest(BaseModel):
    """Modèle pour recevoir la requête avec l'URL du site."""
    url: str

def run_solver(url):
    """Lance le solveur de CAPTCHA en arrière-plan."""
    bot = CaptchaAutomation(url)
    bot.solve_captcha()

@app.post("/solve")
def solve_captcha(request: CaptchaRequest):
    """API pour déclencher la résolution du CAPTCHA."""
    thread = threading.Thread(target=run_solver, args=(request.url,))
    thread.start()
    return {"status": "Solving started", "url": request.url}
