import { API_HOST } from "./const";

interface CoordenadasResponse {
    coordenadasEnviadas?: Boolean;
}

interface Casilla {
    row: number;
    col: number;
}

const JugarCartaMovimiento = async (
    casilla1: Casilla,
    casilla2: Casilla,
    id_partida: number,
    id_jugador: number,
    codCartaMov: string
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
                    casilla1: {
                        row: casilla1.row,
                        col: casilla1.col,
                    },
                    casilla2: {
                        row: casilla2.row,
                        col: casilla2.col,
                    },
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

export { JugarCartaMovimiento, type CoordenadasResponse };
export type { Casilla };
