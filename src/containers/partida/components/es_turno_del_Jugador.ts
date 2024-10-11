export const esTurnoDelJugador = (
    cartaSeleccionada: number | undefined,
    turno_actual: { id: number } | undefined,
    jugador: { id: number } | undefined
): boolean => {
    return cartaSeleccionada !== null && turno_actual?.id === jugador?.id;
};
