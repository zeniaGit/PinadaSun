import aiofiles
from fastapi import FastAPI, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime

# =========================================================================
# Instrucciones de Integración:
# Puedes correr este archivo de forma independiente (uvicorn fastapi_tracker:app)
# o copiar la clase VisitLog, la función append_to_log y el endpoint @app.post 
# a tu backend de FastAPI existente (ej. main.py en mail-bot o Calendario).
# =========================================================================

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://pinadasun.com", "https://www.pinadasun.com"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

class VisitLog(BaseModel):
    pathname: str

LOG_FILE_PATH = "/var/log/pinadasun_visitors.log"

async def append_to_log(log_entry: str):
    # Escribe el log de forma asíncrona para no bloquear peticiones
    async with aiofiles.open(LOG_FILE_PATH, mode="a") as f:
        await f.write(log_entry + "\n")

@app.post("/api/track-visit")
async def track_visit(visit: VisitLog, request: Request, background_tasks: BackgroundTasks):
    forwarded_for = request.headers.get("X-Forwarded-For")
    real_ip = request.headers.get("X-Real-IP")
    
    if forwarded_for:
        client_ip = forwarded_for.split(",")[0].strip()
    elif real_ip:
        client_ip = real_ip.strip()
    else:
        client_ip = request.client.host if request.client else "unknown"

    timestamp = datetime.now().strftime("%d/%b/%Y")
    log_entry = f"[{timestamp}] | {client_ip} | {visit.pathname}"

    background_tasks.add_task(append_to_log, log_entry)
    return {"status": "tracked"}
