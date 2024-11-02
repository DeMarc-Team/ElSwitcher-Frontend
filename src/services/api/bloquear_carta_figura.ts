import { API_HOST } from "./const";

interface Casilla {
    row: number;
    column: number;
}

const BloquearCartaFiguraDeOtroJugador = async (
    figura: Casilla[],
    id_partida: number,
    id_jugador: number,
    id_jugador_a_bloquear: number,
    codCartaFig: string
): Promise<any> => {
    try {
        const response = await fetch(
            `${API_HOST}/juego/${id_partida}/jugadores/${id_jugador}/bloquear-carta`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    figura: figura.map((casilla) => ({
                        row: casilla.row,
                        col: casilla.column,
                    })),
                    carta_fig: codCartaFig,
                    id_jugador_bloqueado: id_jugador_a_bloquear,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(
                `Error al enviar, bloquear la carta de figura de otro jugador: ${response.statusText}`
            );
        }
        return response.json();
    } catch (error) {
        console.error(
            "Error al bloquear la carta de figura de otro jugador:",
            error
        );
        throw error;
    }
};

export { BloquearCartaFiguraDeOtroJugador };
