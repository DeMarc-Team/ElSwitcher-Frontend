import { API_HOST } from "./const";
interface Casilla {
    row: number;
    column: number;
}

interface Tablero {
    tablero6x6: number[][];
    figuras: [string, Casilla[]][];
}

const ObtenerTablero = async (id_partida: number): Promise<Tablero> => {
    // try {
    //     const response = await fetch(
    //         `${API_HOST}/juego/${id_partida}/tablero`,
    //         {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         }
    //     );

    //     if (!response.ok) {
    //         throw new Error(
    //             `Fallo obteniendo el tablero!  Status: ${response.status}`
    //         );
    //     }

    //     const data = await response.json();
    //     return {
    //         tablero6x6: data.tablero6x6,
    //         figuras: data.figuras,
    //     };
    // } catch (error) {
    //     console.error("Error talero:", error);
    //     throw error;
    // }
    try {
        // Hardcodear valores
        const tablero6x6 = [
            [3, 1, 2, 3, 4, 1],
            [1, 2, 3, 4, 1, 2],
            [2, 3, 4, 1, 2, 3],
            [3, 4, 1, 2, 3, 4],
            [4, 1, 2, 3, 4, 1],
            [1, 2, 3, 4, 1, 2],
        ];

        const figuras: [string, Casilla[]][] = [
            ["f1", [{ row: 0, column: 0 }, { row: 0, column: 1 }]],
            ["f1", [{ row: 1, column: 2 }, { row: 1, column: 3 }]],
            ["f2", [{ row: 3, column: 2 }, { row: 3, column: 3 }, { row: 3, column: 4 }]],
        ];

        // Devuelve los valores hardcodeados
        return {
            tablero6x6,
            figuras,
        };
    } catch (error) {
        console.error("Error obteniendo tablero:", error);
        throw error;
    }
};

export { ObtenerTablero, type Tablero, type Casilla };

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
