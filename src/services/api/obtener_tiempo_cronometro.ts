import { API_HOST } from "./const";

interface CronometroResponse {
    inicio: string;
    duracion: number;
}

const ObtenerTiempoCronometro = async (
    id_partida: number
): Promise<CronometroResponse> => {
    try {
        const response = await fetch(
            `${API_HOST}/juego/${id_partida}/cronometro`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                `Error al recibir los datos del cronómetro: ${response.statusText}`
            );
        }
        return response.json();
    } catch (error) {
        console.error("Error al recibir los datos del cronómetro:", error);
        throw error;
    }
};

export { ObtenerTiempoCronometro, type CronometroResponse };
