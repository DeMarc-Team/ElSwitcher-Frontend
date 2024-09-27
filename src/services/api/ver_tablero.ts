import { API_HOST } from "./const";

interface CartaFigura {
    tablero6x6: string[][], 
    iniciada:boolean;
}


const ObtenerCartasFiguras = async (id_partida: number): Promise<Tablero> => {
    try {
        const response = await fetch(
            `${API_HOST}/juego/${id_partida}/tablero`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                `Fallo obteniendo el tablero!  Status: ${response.status}`
            );
        }

        return await response.json();

    } catch (error) {
        console.error("Error talero:", error);
        throw error;
    }
}

export { ObtenerCartasFiguras, type Tablero };