import { API_HOST } from "./const";

interface Tablero {
    tablero6x6: number[][];
    iniciada: boolean;
}

const TABLERO_MANUAL: Tablero = {
    tablero6x6: [
        [3, 1, 2, 3, 0, 1],
        [1, 2, 3, 0, 1, 2],
        [2, 3, 0, 1, 2, 3],
        [3, 0, 1, 2, 3, 0],
        [0, 1, 2, 3, 0, 1],
        [1, 2, 3, 0, 1, 2],
    ],
    iniciada: true, // Cambia este valor según sea necesario
};

const ObtenerTablero = async (id_partida: number): Promise<Tablero> => {
    try {
        /*const response = await fetch(
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

        return await response.json();*/
        return TABLERO_MANUAL;
    } catch (error) {
        console.error("Error talero:", error);
        throw error;
    }
};

export { ObtenerTablero, type Tablero };
