import { API_HOST } from "./const";

interface Jugador {
    id_jugador: number;
    nombre: string;
}

interface ObtenerInfoPartidaResponse {
    nombre_partida: string;
    jugadores: Jugador[];
}

const ObtenerInfoPartida = async (
    id_partida: number
): Promise<ObtenerInfoPartidaResponse> => {
    try {
        const response = await fetch(
            `${API_HOST}/partidas/${id_partida}/jugadores`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                `Fallo obteniendo jugadores! Status: ${response.status}`
            );
        }

        const data: ObtenerInfoPartidaResponse = {
            nombre_partida: "NOMBRE PARTIDA",
            jugadores: await response.json(),
        };
        return data;
    } catch (error) {
        console.error("Error fetching jugadores:", error);
        throw error;
    }
};

export { ObtenerInfoPartida, type ObtenerInfoPartidaResponse, type Jugador };
