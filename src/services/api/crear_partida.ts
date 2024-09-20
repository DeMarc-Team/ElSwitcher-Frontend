import { API_HOST } from "./const";

interface CrearPartidaForm {
    nombre_partida: string;
    nombre_creador: string;
}

interface CrearPartidaResponse {
    id: number,
    nombre_creador: string,
    nombre_partida: string,
}

const crearPartida = async (
    form: CrearPartidaForm
): Promise<CrearPartidaResponse> => {
    try {
        const response = await fetch(`${API_HOST}/partidas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre_partida: form.nombre_partida,
                nombre_creador: form.nombre_creador,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error al crear la partida: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al crear la partida:", error);
        throw error;
    }
};

export { crearPartida, type CrearPartidaForm, type CrearPartidaResponse };
