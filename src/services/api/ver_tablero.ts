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

const procesarFiguras = (figurasResaltadas: any): Figura[] => {
    const figuras: Figura[] = [];

    for (const nombre in figurasResaltadas) {
        const formaciones = figurasResaltadas[nombre];

        for (const formacion of formaciones) {
            // Construir la figura usando las coordenadas
            const figura: Figura = {
                nombre,
                casillas: [],
            };
            for (const casilla of formacion) {
                figura.casillas.push({
                    row: casilla[0] !== null ? casilla[0] : -1,
                    column: casilla[1] !== null ? casilla[1] : -1,
                });
            }
            // Pushear la figura construida
            figuras.push(figura);
        }
    }
    return figuras;
};
export { ObtenerTablero, type Casilla, type Figura, type Tablero };
