import { API_HOST } from "./const";

interface Casilla {
    row: number;
    column: number;
}

interface JugarCartaFiguraResponse {
    cartaJugada?: boolean;
}

const JugarCartaFigura = async (
    figura: Casilla[],
    id_partida: number,
    id_jugador: number,
    codCartaFig: string
): Promise<JugarCartaFiguraResponse> => {
    try {
        const response = await fetch(
            `${API_HOST}/juego/${id_partida}/jugadores/${id_jugador}/tablero/figura`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    carta_fig: codCartaFig,
                    figura: figura.map((casilla) => ({
                        row: casilla.row,
                        column: casilla.column,
                    })),
                }),
            }
        );

        if (!response.ok) {
            throw new Error(
                `Error al enviar la jugada de la figura: ${response.statusText}`
            );
        }
        return response.json();
    } catch (error) {
        console.error("Error al jugar la carta de figura:", error);
        throw error;
    }
};

export { JugarCartaFigura, type JugarCartaFiguraResponse };
