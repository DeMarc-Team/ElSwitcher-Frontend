import { API_HOST } from "./const";

/**
 * Abandona una partida de juego.
 *
 * @param id_partida - El identificador de la partida.
 * @param id_jugador - El identificador del usuario que desea abandonar la partida.
 * @returns Un objeto que indica si el usuario es el ganador por quedar solo.
 *
 * @note Si el jugador es el creador de la partida y la partida no esta iniciada, no puede abandonar la partida.
 *
 * @throws Error si ocurre un error con la api intentando abandonar la partida.
 */
const AbandonarPartida = async (id_partida: number, id_jugador: number) => {
    try {
        const response = await fetch(
            `${API_HOST}/partidas/${id_partida}/jugadores/${id_jugador}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                `Error al abandonar la partida: ${response.statusText}`
            );
        }
    } catch (error) {
        console.error("Error al abandonar la partida:", error);
        throw error;
    }
};

export { AbandonarPartida };
