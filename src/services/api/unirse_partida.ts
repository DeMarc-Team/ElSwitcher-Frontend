import { API_HOST } from "./const";

interface UnirsePartidaResponse {
    nombre: string;
    id_jugador: number;
}

const UnirsePartida = async (
    partidaId: number,
    username: string,
    // contraseña: string, //TODO
): Promise<UnirsePartidaResponse> => {
    try {
        const response = await fetch(
            `${API_HOST}/partidas/${partidaId}/jugadores`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: username,
                    // contraseña: contraseña, //TODO
                }),
            }
        );

        if (!response.ok) {
            throw new Error(
                `Error al unirse a la partida: ${response.statusText}`
            );
        }
        return response.json();
    } catch (error) {
        console.error("Error al unirse a la partida:", error);
        throw error;
    }
};

export { UnirsePartida, type UnirsePartidaResponse };
