import { API_HOST } from "./const";

interface CoordenadasResponse {
    coordenadasEnviadas?: Boolean;
}

interface Casilla {
    row: number;
    col: number;
}

const JugarcartaMovimiento = async (
    casilla1: Casilla,
    casilla2: Casilla,
    codCartaMov: string,
    id_partida: number,
    id_jugador: number
): Promise<CoordenadasResponse> => {
    try {
        const response = await fetch(
            `${API_HOST}/juego/${id_partida}/jugadores/${id_jugador}/tablero/casilla`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    casilla1: casilla1,
                    casilla2: casilla2,
                    codeMove: codCartaMov,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(
                `Error al enviar las coordenadas de las casiilas: ${response.statusText}`
            );
        }
        return response.json();
    } catch (error) {
        console.error(
            "Error al enviar las coordenadas de las casillas:",
            error
        );
        throw error;
    }
};

export { JugarcartaMovimiento, type CoordenadasResponse };
export type { Casilla };
