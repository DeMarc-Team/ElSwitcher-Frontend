import { API_HOST } from "./const"


interface InfoTurnoResponse {
    id_jugador: string;
    nombre_jugador: string;
}

const ObtenerInfoTurno = async (
    id_partida: string
): Promise<InfoTurnoResponse> => {

    try {
        const response = await fetch(`${API_HOST}/partida/${id_partida}/turno`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error en ObtenerInfoTurno: ", error);
        throw new Error("Error en obtener la información del turno de la partida: " + id_partida);
    }
}

export { ObtenerInfoTurno, type InfoTurnoResponse }