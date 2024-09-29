import { API_HOST } from "./const";

interface IniciarPartidaResponse {
    partidaIniciadaConExito: Boolean;
}

const IniciarPartida = async (
    partidaId: number
): Promise<IniciarPartidaResponse> => {
    try {
        const response = await fetch(`${API_HOST}/partidas/${partidaId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(
                `Error al iniciar la partida: ${response.statusText}`
            );
        }
        return response.json();
    } catch (error) {
        console.error("Error al iniciar la partida:", error);
        throw error;
    }
};

export { IniciarPartida, type IniciarPartidaResponse };
