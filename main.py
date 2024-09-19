from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

# Crear una instancia de la aplicación FastAPI
app = FastAPI()

# Definir la estructura de una Partida usando Pydantic
class Partida(BaseModel):
    id: int
    nombre_partida: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint para obtener todas las partidas
@app.get("/partidas")
async def obtener_partidas():
    partidas = [
    Partida(id=1, nombre_partida="Partida 1"),
    Partida(id=2, nombre_partida="Partida 2"),
    Partida(id=3, nombre_partida="Partida 3"),
    Partida(id=4, nombre_partida="Partida 4"),
    ]
    return partidas
