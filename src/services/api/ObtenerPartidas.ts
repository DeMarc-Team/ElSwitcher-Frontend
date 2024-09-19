import { API_HOST } from "./const";

interface Partida {
    id: number;
    nombre_partida: string;
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
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Partida[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching partidas:", error);
        throw error;
    }
};

export { ObtenerPartidas, type Partida};
