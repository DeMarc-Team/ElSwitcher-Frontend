import { API_HOST } from "./const";

interface CartaFiguraResponse {
    figura: string;
    bloqueada: boolean;
}

const ObtenerCartasFiguras = async (
    id_partida: number,
    id_jugador: number
): Promise<CartaFiguraResponse[]> => {
    try {
        const response = await fetch(
            `${API_HOST}/juego/${id_partida}/jugadores/${id_jugador}/cartas_figura`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                `Fallo obteniendo las cartas figuras!  Status: ${response.status}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Error cartas de figuras:", error);
        throw error;
    }
};

// const ObtenerCartasFiguras = async (
//     _: number,
//     __: number
// ): Promise<CartaFiguraResponse[]> => {
//     return [
//         { figura: "f1", bloqueada: true },
//         { figura: "f2", bloqueada: true },
//         { figura: "f3", bloqueada: false },
//     ];
// }

export { ObtenerCartasFiguras, type CartaFiguraResponse };
