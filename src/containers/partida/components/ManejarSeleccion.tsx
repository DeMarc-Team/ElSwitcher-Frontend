import { Casilla } from "@/services/api/jugar_carta_movimiento";

export const manejarSeleccion = (
    row: number,
    col: number,
    primeraSeleccion: { row: number; col: number } | null,
    setPrimeraSeleccion: (value: { row: number; col: number } | null) => void,
    segundaSeleccion: { row: number; col: number } | null,
    setSegundaSeleccion: (value: { row: number; col: number } | null) => void,
    setPasarTurno: (value: boolean) => void,
    esCasillaResaltada: (row: number, col: number) => boolean,
    resaltarCasillas: (row: number, col: number) => void,
    enviarMovimiento: (casilla1: Casilla, casilla2: Casilla) => Promise<void>,
    reiniciarSeleccion: () => void
) => {
    // Si ya se seleccionaron ambas casillas, no hace nada
    if (primeraSeleccion && segundaSeleccion) {
        console.log("Ya has seleccionado ambas celdas.");
        return;
    }

    // Si aún no hay una primera selección, selecciona la primera casilla
    if (!primeraSeleccion) {
        setPrimeraSeleccion({ row, col });
        setPasarTurno(false);
        resaltarCasillas(row, col);
        return;
    }

    // Si la casilla no está resaltada, reinicia la selección
    if (!esCasillaResaltada(row, col)) {
        setPrimeraSeleccion({ row, col });
        setPasarTurno(false);
        resaltarCasillas(row, col);
        return;
    }

    // Si está resaltada, selecciona la segunda casilla y envía el movimiento
    setSegundaSeleccion({ row, col });
    enviarMovimiento(
        { row: primeraSeleccion.row, col: primeraSeleccion.col },
        { row, col }
    ).then(() => {
        reiniciarSeleccion();
        setPasarTurno(true);
    });
};

export const reiniciarSeleccion = (
    setPrimeraSeleccion: (value: { row: number; col: number } | null) => void,
    setSegundaSeleccion: (value: { row: number; col: number } | null) => void,
    setCartaSeleccionada: (value: any) => void,
    setCasillasMovimientos: (value: any[]) => void
) => {
    setPrimeraSeleccion(null); // Borra la selección de la primera casilla
    setSegundaSeleccion(null); // Borra la selección de la segunda casilla
    setCartaSeleccionada(undefined); // Borra la carta seleccionada (si aplica)
    setCasillasMovimientos([]); // Limpia las casillas resaltadas de posibles movimientos
};
