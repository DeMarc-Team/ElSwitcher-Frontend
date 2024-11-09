import { API_HOST } from "./const";

interface EnviarMensajeResponse {
    mensajeEnviadoConExito: Boolean;
}

const EnviarMensaje = async (
    partidaId: number,
    jugadorId: number,
    mensaje: string
): Promise<EnviarMensajeResponse> => {
    try {
        const response = await fetch(
            `${API_HOST}/juego/${partidaId}/jugadores/${jugadorId}/chat`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: mensaje }),
            }
        );
        console.log("----------", response);
        if (!response.ok) {
            throw new Error(
                `Error al enviar el mensaje: ${response.statusText}`
            );
        }
        return response.json();
    } catch (error) {
        console.error("Error al enviar el mensaje:", error);
        throw error;
    }
};

export { EnviarMensaje, type EnviarMensajeResponse };
