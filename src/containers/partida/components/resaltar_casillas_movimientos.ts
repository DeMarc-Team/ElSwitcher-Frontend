import { Casilla } from "@/services/api/jugar_carta_movimiento";

const ResaltarCasillasMovimientos = (
    row: number,
    col: number,
    rotVec: { x: number; y: number },
    codigoCartaMovimiento: string
): Casilla[] => {
    let casillasMove: Casilla[] = [];

    if (
        rotVec !== null &&
        (codigoCartaMovimiento === "m1" || codigoCartaMovimiento === "m4")
    ) {
        casillasMove = [
            { row: row + rotVec.x, col: col + rotVec.y },
            { row: row + rotVec.x, col: col - rotVec.y },
            { row: row - rotVec.x, col: col + rotVec.y },
            { row: row - rotVec.x, col: col - rotVec.y },
        ];
    } else if (
        rotVec !== null &&
        (codigoCartaMovimiento === "m6" || codigoCartaMovimiento === "m5")
    ) {
        casillasMove = [
            { row: row - rotVec.x, col: col + rotVec.y },
            { row: row - rotVec.y, col: col - rotVec.x },
            { row: row + rotVec.x, col: col - rotVec.y },
            { row: row + rotVec.y, col: col + rotVec.x },
        ];
    } else if (rotVec !== null) {
        casillasMove = [
            { row: row + rotVec.x, col: col },
            { row: row, col: col - rotVec.x },
            { row: row, col: col + rotVec.x },
            { row: row - rotVec.x, col: col },
        ];
    }

    return casillasMove;
};

export { ResaltarCasillasMovimientos };
