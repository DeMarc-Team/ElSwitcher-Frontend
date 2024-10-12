import { API_HOST } from "./const";

interface CartaMovimientoParcialesResponse {
    movimiento: string;
    orden: number;
}

const ObtenerCartasMovimientosParciales = async (
    id_partida: number,
    id_jugador: number
): Promise<CartaMovimientoParcialesResponse[]> => {
    try {
        const response = await fetch(
            `${API_HOST}/juego/${id_partida}/jugadores/${id_jugador}/mov-parciales`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                `Fallo obteniendo las cartas movimientos parciales!  Status: ${response.status}`
            );
        }
        let data = await response.json();
        data = data.map((carta: any) => {
            return {
                movimiento: carta.movimiento,
                orden: carta.orden,
            };
        });
        return data;
    } catch (error) {
        console.error("Error cartas de movimientos parciales:", error);
        throw error;
    }
};

export {
    ObtenerCartasMovimientosParciales,
    type CartaMovimientoParcialesResponse,
};
