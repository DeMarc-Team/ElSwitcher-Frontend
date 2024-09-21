const API_HOST = "http://127.0.0.1:8000";

interface Players {
    id_jugador: number;
    nombre: string;
}

const Jugadores = async (): Promise<Players[]> => {
    try {
        /*const response = await fetch(`${API_HOST}/waiting_room`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Players[] = await response.json();*/
           const data: Players[] = [
            { id_jugador: 1, nombre: "Daián" },
            { id_jugador: 1, nombre: "Daián" },
            { id_jugador: 2, nombre: "Exequiel" }
           ]
        return data;
    } catch (error) {
        console.error("Error fetching jugadores:", error);
        throw error;
    }
};

export { Jugadores, type Players };