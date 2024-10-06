import { API_HOST } from "./const";

interface CoordenadasResponse {
    coordenadasEnviadas?: Boolean;
}

interface Coordenadas {
    casilla1: number;
    casilla2: number;
}

const CoordenadasCasillas = async (
    coordenadas: Coordenadas,
    id_partida: number,
    id_jugador: number
): Promise<CoordenadasResponse> => {
    try {
        const response = await fetch(
            `${API_HOST}/partidas/${id_partida}/tablero/${id_jugador}/coordenadas`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    casilla1: coordenadas.casilla1,
                    casilla2: coordenadas.casilla2,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(
                `Error al enviar las coordenadas de las casiilas: ${response.statusText}`
            );
        }
        return response.json();
    } catch (error) {
        console.error(
            "Error al enviar las coordenadas de las casillas:",
            error
        );
        throw error;
    }
};

export { CoordenadasCasillas, type CoordenadasResponse };
