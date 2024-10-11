//NOTA: Se hace esta pequeña corroboración por el caso en el que la respuesta de la API me haya traido
//alguna casilla vacia, si ese fuera el caso coloco un valor que sea imposible que tenga una casilla
//(en este caso el -1) para que luego en los test el tablero no renderice correctamente.

import { API_HOST } from "./const";
interface Casilla {
    row: number;
    column: number;
}

interface Figura {
    nombre: string;
    casillas: Casilla[];
}

interface Tablero {
    tablero6x6: number[][];
    figuras: Figura[];
}

const procesarFiguras = (figurasResaltadas: any): Figura[] => {
    const figuras: Figura[] = [];

    for (const nombre in figurasResaltadas) {
        const casillas = figurasResaltadas[nombre];

        const figura: Figura = {
            nombre,
            casillas: [],
        };

        for (const subArray of casillas) {
            for (const casilla of subArray) {
                figura.casillas.push({
                    // Ver Nota del principio.
                    row: casilla[0] !== null ? casilla[0] : -1,
                    column: casilla[1] !== null ? casilla[1] : -1,
                });
            }
        }

        figuras.push(figura);
    }

    return figuras;
};

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
        let tablero = data.tablero;

        const figuras = procesarFiguras(data.figuras_a_resaltar);

        return {
            tablero6x6: tablero,
            figuras,
        };
    } catch (error) {
        console.error("Error talero:", error);
        throw error;
    }
};
export { ObtenerTablero, type Tablero, type Casilla, type Figura};


//Hardcodeo para probar el destacado de las figuras
// const hardcodedTablero: number[][] = [
//     [3, 3, 2, 1, 4, 1],
//     [1, 2, 3, 4, 1, 2],
//     [2, 3, 4, 1, 2, 3],
//     [3, 4, 1, 2, 3, 4],
//     [4, 1, 2, 3, 4, 1],
//     [1, 2, 3, 4, 1, 2],
// ];

// const hardcodedFiguras: Figura[] = [
//     {
//         nombre: "f2",
//         casillas: [
//             { row: 0, column: 0 },
//             { row: 0, column: 1 },
//             { row: 1, column: 1 },
//             { row: 1, column: 2 },
//             { row: 1, column: 3 },
//         ],
//     },
//     {
//         nombre: "f1",
//         casillas: [
//             { row: 3, column: 0 },
//             { row: 3, column: 1 },
//             { row: 3, column: 2 },
//             { row: 4, column: 1 },
//             { row: 5, column: 1 },
//         ],
//     },
// ];

// const ObtenerTablero = async (id_partida: number): Promise<Tablero> => {
//     // Simulando la respuesta hardcoded
//     return{
//             tablero6x6: hardcodedTablero,
//             figuras: hardcodedFiguras,
//     };
// };
// export { ObtenerTablero, type Tablero, type Casilla, type Figura};
