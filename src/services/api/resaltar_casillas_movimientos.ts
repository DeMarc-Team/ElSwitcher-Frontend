import { API_HOST } from "./const";

interface Casilla {
    row: number;
    col: number;
}

const ResaltarCasillasMovimientos = async (
    id_partida: number,
    id_jugador: number,
    casilla_: Casilla,
    codeMove: string
): Promise<Casilla[]> => {
    try {
        /*const response = await fetch(
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

        return await response.json();*/

        return await [
            { row: casilla_.row - 1, col: casilla_.col - 1 },
            { row: casilla_.row - 1, col: casilla_.col + 1 },
            { row: casilla_.row + 1, col: casilla_.col - 1 },
            { row: casilla_.row + 2, col: casilla_.col + 2 },
        ];
    } catch (error) {
        console.error(
            "Fallo enviado las coordenadas de las casillas y el código de la carta!",
            error
        );
        throw error;
    }
};

export { ResaltarCasillasMovimientos, type Casilla };
