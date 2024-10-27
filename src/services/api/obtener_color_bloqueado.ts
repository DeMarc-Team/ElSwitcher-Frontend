import { API_HOST } from "./const";

const ObtenerColorBloqueado = async (id_partida: number): Promise<number> => {
    try {
        // const response = await fetch(
        //     `${API_HOST}/juego/${id_partida}/colorProhibido`,
        //     {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     }
        // );

        // if (!response.ok) {
        //     throw new Error(
        //         `Fallo obteniendo el color bloqueado Status: ${response.status}`
        //     );
        // }

        // const data = await response.json();
        //return data-1;
        return 3 - 1;
    } catch (error) {
        console.error("Error color prohibido:", error);
        throw error;
    }
};

export { ObtenerColorBloqueado };
