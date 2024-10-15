import { API_HOST } from "./const";

interface CartaFiguraResponse {
    figura: string;
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

export { ObtenerCartasFiguras, type CartaFiguraResponse };
