from fastapi import FastAPI
from mpmath import mp

app = FastAPI()

DIGITOS_PI = 10_000
mp.dps = DIGITOS_PI + 2
pi_str = str(mp.pi)[2:DIGITOS_PI+2]

@app.get("/pi")
async def get_pi():
    return {"pi": f"3.{pi_str}"}
