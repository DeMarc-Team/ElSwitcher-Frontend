import { API_HOST } from "./const";

interface Partida {
    id: number;
    nombre_partida: string;
    numero_de_jugadores: number;
    // es_privada: boolean; //TODO: permitir esto
}

const ObtenerPartidas = async (): Promise<Partida[]> => {
    try {
        const response = await fetch(`${API_HOST}/partidas`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(
                `Error al obtener partidas: ${response.statusText}`
            );
        }

        const data: Partida[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener partidas:", error);
        throw error;
    }
};

export { ObtenerPartidas, type Partida };
