import { API_HOST } from "./const";

interface CrearPartidaForm {
    nombre_partida: string;
    nombre_creador: string;
    privada: boolean;
    contraseña: string;
}

interface CrearPartidaResponse {
    id: number;
    nombre_partida: string;
    nombre_creador: string;
    id_creador: number;
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
                privada: form.privada,
                contraseña: form.contraseña,
            }),
        });

        if (!response.ok) {
            throw new Error(
                `Error al crear la partida: ${response.statusText}`
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al crear la partida:", error);
        throw error;
    }
};

export { crearPartida, type CrearPartidaForm, type CrearPartidaResponse };
