import { API_HOST } from "./const";

interface CartaMovimientoResponse {
    movimiento: string;
    parcialmente_usada: boolean;
}

const ObtenerCartasMovimientos = async (
    id_partida: number,
    id_jugador: number
): Promise<CartaMovimientoResponse[]> => {
    try {
        const response = await fetch(
            `${API_HOST}/juego/${id_partida}/jugadores/${id_jugador}/cartas_movimiento`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                `Fallo obteniendo las cartas movimientos!  Status: ${response.status}`
            );
        }
        let data = await response.json();

        // TODO: cuando este el back, quitar esto:
        data = data.map((carta: any) => {
            return {
                movimiento: carta.movimiento,
                parcialmente_usada: false,
            };
        });
        return data;
    } catch (error) {
        console.error("Error cartas de movimientos:", error);
        throw error;
    }
};

export { ObtenerCartasMovimientos, type CartaMovimientoResponse };
