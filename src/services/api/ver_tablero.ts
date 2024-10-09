import { API_HOST } from "./const";
interface Casilla {
    row: number;
    column: number;
}

interface Figura {
    nombre: string;
    casillas: Casilla [];
}

interface Tablero {
    tablero6x6: number[][];
    figuras: Figura [];
}

const ObtenerTablero = async (id_partida: number): Promise<Tablero> => {
    try {
        const response = await fetch(
            `${API_HOST}/juego/${id_partida}/tablero`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                `Fallo obteniendo el tablero!  Status: ${response.status}`
            );
        }

        const data = await response.json();
        let tablero = data.tablero 
        const figuras: Figura[] = [];
        
        for (const nombre in data.figuras_a_resaltar) {
            const casillas = data.figuras_a_resaltar[nombre];

            const figura: Figura = {
                nombre,
                casillas: [],
            };
        
            for (const subArray of casillas) {
                for (const casilla of subArray) {
                    figura.casillas.push({
                        row: casilla[0] !== null ? casilla[0] : -1,
                        column: casilla[1] !== null ? casilla[1] : -1,
                    });
                }
            }

            figuras.push(figura);
        }

        return {
            tablero6x6:tablero,
            figuras,
        };
    } catch (error) {
        console.error("Error talero:", error);
        throw error;
    }
};

export { ObtenerTablero, type Tablero, type Casilla, type Figura};

// const TABLERO_MANUAL: Tablero = {
//     tablero6x6: [
//         [3, 1, 2, 3, 0, 1],
//         [1, 2, 3, 0, 1, 2],
//         [2, 3, 0, 1, 2, 3],
//         [3, 0, 1, 2, 3, 0],
//         [0, 1, 2, 3, 0, 1],
//         [1, 2, 3, 0, 1, 2],
//     ],
//     iniciada: true, // Cambia este valor según sea necesario
// };
