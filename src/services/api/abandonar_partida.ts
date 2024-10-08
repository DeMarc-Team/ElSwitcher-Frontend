import { API_HOST } from "./const";
import { ObtenerInfoPartida } from "./obtener_info_partida";

/**
 * Abandona una partida de juego.
 *
 * @param id_partida - El identificador de la partida.
 * @param id_jugador - El identificador del usuario que desea abandonar la partida.
 * @returns Un objeto que indica si el usuario es el ganador por quedar solo.
 *
 * @note Si el jugador es el creador de la partida y la partida no esta iniciada, no puede abandonar la partida.
 *
 * @throws Error si el creador de la partida intenta abandonarla y la partida no esta inciada
 * @throws Error si ocurre un error con la api intentando abandonar la partida.
 */
const AbandonarPartida = async (id_partida: number, id_jugador: number) => {
    try {
        const infoPartida = await ObtenerInfoPartida(id_partida);

        if (infoPartida.id_creador === id_jugador && !infoPartida.iniciada) {
            throw new Error("El creador de la partida no puede abandonarla.");
        }

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
