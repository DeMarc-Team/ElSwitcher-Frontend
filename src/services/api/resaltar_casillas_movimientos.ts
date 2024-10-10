import { API_HOST } from "./const";

interface CasillasResponse {
    casilla: Casilla;
}

interface Casilla {
    row: number;
    col: number;
}

const ResaltarCasillasMovimientos = async (
    id_partida: number,
    id_jugador: number,
    casilla_: Casilla,
    codeMove: string
): Promise<CasillasResponse[]> => {
    try {
        const response = await fetch(
            `${API_HOST}/juego/${id_partida}/jugadores/${id_jugador}/tablero/resaltar/casillas`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    carta_mov: codeMove,
                    casilla: casilla_,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(
                `Fallo enviado las coordenadas de las casillas y el código de la carta!  Status: ${response.status}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error(
            "Fallo enviado las coordenadas de las casillas y el código de la carta!",
            error
        );
        throw error;
    }
};

export { ResaltarCasillasMovimientos, type CasillasResponse };
export type { Casilla };
