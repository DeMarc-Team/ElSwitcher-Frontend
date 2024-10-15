import { API_HOST } from "./const";

/**
 * Cancela un movimiento parcial de un jugador en una partida de juego.
 *
 * @param id_partida - El identificador de la partida.
 * @param id_jugador - El identificador del jugador.
 *
 * @note se cancela solo el último movimiento parcial.
 **/
const CancelarMovParcial = async (id_partida: number, id_jugador: number) => {
    try {
        const response = await fetch(
            `${API_HOST}/juego/${id_partida}/jugadores/${id_jugador}/mov-parciales`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                `Error al cancelar el movimiento parcial: ${response.statusText}`
            );
        }
    } catch (error) {
        console.error("Error al cancelar el movimiento parcial:", error);
        throw error;
    }
};

export { CancelarMovParcial };
