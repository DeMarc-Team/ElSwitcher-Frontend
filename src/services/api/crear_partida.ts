import { API_HOST } from "./const";

interface CrearPartidaForm {
    nombre_partida: string;
    max_jugadores: number;
    min_jugadores: number;
    nombre_creador: string;
}

// TODO: ESPECIFICAR LA SALIDA CORRECTAMENTE.
interface CrearPartidaResponse {
    id_partida: string;
    token_creador: string;
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
                max_jugadores: form.max_jugadores,
                min_jugadores: form.min_jugadores,
                nombre_creador: form.nombre_creador,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        // TODO: MEJORAR EL MANEJO DE ERRORES.
        console.error("Error creating partida:", error);
        throw error;
    }
};

export { crearPartida, type CrearPartidaForm, type CrearPartidaResponse };
