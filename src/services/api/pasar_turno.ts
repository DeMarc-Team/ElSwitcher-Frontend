import { API_HOST } from "./const";

const PasarTurno = async (idPartida: number, idJugador: number) => {
    try {
        const response = await fetch(
            `${API_HOST}/juego/${idPartida}/jugadores/${idJugador}/turno`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) {
            throw new Error(`Error al pasar el turno: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error al pasar el turno:", error);
        throw new Error("Error al pasar el turno.");
    }
};

export { PasarTurno };
