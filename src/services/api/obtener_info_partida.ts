import { API_HOST } from "./const";

interface Jugador {
    id_jugador: number;
    nombre: string;
}

interface ObtenerInfoPartidaResponse {
    nombre_partida: string;
    nombre_creador: string;
    jugadores: Jugador[];
    cantidad_jugadores: number;
    iniciada: boolean;
}

const ObtenerInfoPartida = async (
    id_partida: number
): Promise<ObtenerInfoPartidaResponse> => {
    try {
        const response = await fetch(`${API_HOST}/partidas/${id_partida}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const { nombre_partida, nombre_creador, iniciada } =
            await response.json();

        if (!response.ok || !nombre_partida) {
            throw new Error(
                `Fallo obteniendo info de la partida! Status: ${response.status}`
            );
        }

        const listaDeJugadores = await ObtenerJugadores(id_partida);
        const data: ObtenerInfoPartidaResponse = {
            nombre_partida,
            nombre_creador,
            jugadores: listaDeJugadores,
            cantidad_jugadores: listaDeJugadores.length,
            iniciada,
        };
        return data;
    } catch (error) {
        console.error("Error fetching jugadores:", error);
        throw error;
    }
};

const ObtenerJugadores = async (id_partida: number): Promise<Jugador[]> => {
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

        return await response.json();
    } catch (error) {
        console.error("Error fetching jugadores:", error);
        throw error;
    }
};

export { ObtenerInfoPartida, type ObtenerInfoPartidaResponse, type Jugador };
