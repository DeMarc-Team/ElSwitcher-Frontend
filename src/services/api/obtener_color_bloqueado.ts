import { API_HOST } from "./const";

interface ColorResponse {
    color: number;
}

const ObtenerColorBloqueado = async (
    id_partida: number
): Promise<ColorResponse> => {
    try {
        const response = await fetch(
            `${API_HOST}/juego/${id_partida}/colorProhibido`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                `Fallo obteniendo el color bloqueado Status: ${response.status}`
            );
        }

        const data: ColorResponse = await response.json();
        return { color: data.color - 1 };
    } catch (error) {
        console.error("Error color prohibido:", error);
        throw error;
    }
    //return { color: 4 - 1 }; //Si en dev de back no está todo integrado mockear los bloqueos de color
};

export { ObtenerColorBloqueado, type ColorResponse };
