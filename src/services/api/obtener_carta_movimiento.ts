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
        /*const response = await fetch(
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

        return await response.json();*/
        return mockCartasMovimiento;
    } catch (error) {
        console.error("Error cartas de movimientos:", error);
        throw error;
    }
};

export { ObtenerCartasMovimientos, type CartaMovimientoResponse };

const mockCartasMovimiento: CartaMovimientoResponse[] = [
    {
        movimiento: "m2",
        parcialmente_usada: false,
    },
    {
        movimiento: "m6",
        parcialmente_usada: true,
    },
    {
        movimiento: "m5",
        parcialmente_usada: false,
    },
    {
        movimiento: "m1",
        parcialmente_usada: false,
    },
    {
        movimiento: "m4",
        parcialmente_usada: false,
    },
    {
        movimiento: "m3",
        parcialmente_usada: false,
    },
    {
        movimiento: "m7",
        parcialmente_usada: false,
    },
];
