from fastapi import FastAPI
from mpmath import mp
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DIGITOS_PI = 50_000
mp.dps = DIGITOS_PI + 2
pi_str = str(mp.pi)[2:DIGITOS_PI+2]

@app.get("/pi")
async def get_pi():
    return {"pi": f"3.{pi_str}"}
