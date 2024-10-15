import { useMovimientoContext } from "@/context/UsarCartaMovimientoContext";
import { useNotification } from "@/hooks/useNotification";
import { useFiguraContext } from "@/context/UsarCartaFiguraContext";
import { Figura } from "@/services/api/ver_tablero";
import { usePartida } from "@/context/PartidaContext";
import { ResaltarCasillasMovimientos } from "@/containers/partida/components/resalatar_casillas_movimientos";
import { useMovimientos } from "@/containers/partida/components/enviar_movimiento";
import {
    manejarSeleccion,
    reiniciarSeleccion,
} from "@/containers/partida/components/manejar_seleccion_movimiento";
import { JugarCartaFigura } from "@/services/api/jugar_carta_figura";

export const useFuncionesSeleccion = (figuras: Figura[]) => {
    const {
        codigoCartaMovimiento,
        rotVec,
        casillasMovimientos,
        primeraSeleccion,
        segundaSeleccion,
        setCasillasMovimientos,
        setPrimeraSeleccion,
        setSegundaSeleccion,
        setPasarTurno,
        setCartaMovimientoSeleccionada,
    } = useMovimientoContext();

    const { showToastError, showToastInfo, closeToast } = useNotification();
    const { codigoCartaFigura, setFiguraSeleccionada, figuraSeleccionada } =
        useFiguraContext();
    const { turno_actual, jugador, partida } = usePartida();
    const { enviarMovimiento } = useMovimientos();

    // Manejar la lógica de selección de figura
    const manejarSeleccionFigura = (row: number, col: number) => {
        const figura = figuras.find((f) =>
            f.casillas.some(
                (casilla) => casilla.row === row && casilla.column === col
            )
        );

        if (figura && figura.nombre === codigoCartaFigura) {
            setFiguraSeleccionada(figura);
            if (jugador && partida) {
                try{ 
                    JugarCartaFigura(figura.casillas, partida.id , jugador.id, figura.nombre)
                    setTimeout(() => {
                        setFiguraSeleccionada(null)
                    },1000);
                }
                catch (error){
                    console.error("Error al jugar la carta de figura:", error);
                }
            }
            else{
                console.error("Partida o jugador no definido");
            }
        } else {
            manejarErrorSeleccionFigura();
        }
    };

    // Mostrar mensaje si no hay carta seleccionada
    const mostrarMensajeSinSeleccion = () => {
        showToastInfo("No has seleccionado ninguna carta.", true);
        
        setTimeout(() => {
            closeToast();
        }, 2000);
    };

    // Manejar el error si la figura no coincide
    const manejarErrorSeleccionFigura = () => {
        setFiguraSeleccionada(null);
        showToastError("No se puede hacer esa jugada");

        // Cerrar el toast de error después de 2 segundos
        setTimeout(() => {
            closeToast();
        }, 2000);
    };

    // Condición para deshabilitar botones
    const estaDeshabilitado = () => {
        return turno_actual?.id !== jugador?.id;
    };

    // Verificar si una celda es parte de una figura
    const esParteDeFigura = (rowIndex: number, colIndex: number) => {
        return figuras.some((figura) =>
            figura.casillas.some(
                (casilla) =>
                    casilla.row === rowIndex && casilla.column === colIndex
            )
        );
    };

    // Verificar si la figura seleccionada incluye la celda
    const figuraElegida = (rowIndex: number, colIndex: number): boolean => {
        return figuras.some((figura) =>
            figura.casillas.some(
                (casilla) =>
                    casilla.row === rowIndex &&
                    casilla.column === colIndex &&
                    figura === figuraSeleccionada
            )
        );
    };

    // Resaltar casillas para los movimientos
    const resaltarCasillas = (row: number, col: number) => {
        if (rotVec && codigoCartaMovimiento) {
            const casillasMove = ResaltarCasillasMovimientos(
                row,
                col,
                rotVec,
                codigoCartaMovimiento
            );
            setCasillasMovimientos(casillasMove);
        }
    };

    // Verificar si una casilla está resaltada
    const esCasillaResaltada = (row: number, col: number) => {
        return casillasMovimientos.some(
            (casilla) => casilla.row === row && casilla.col === col
        );
    };

    // Manejar la lógica de selección de carta
    const manejarSeleccionMovimiento = (row: number, col: number) => {
        manejarSeleccion(
            row,
            col,
            primeraSeleccion,
            setPrimeraSeleccion,
            segundaSeleccion,
            setSegundaSeleccion,
            setPasarTurno,
            esCasillaResaltada,
            resaltarCasillas,
            enviarMovimiento,
            () =>
                reiniciarSeleccion(
                    setPrimeraSeleccion,
                    setSegundaSeleccion,
                    setCartaMovimientoSeleccionada,
                    setCasillasMovimientos
                )
        );
    };

    return {
        manejarSeleccionFigura,
        mostrarMensajeSinSeleccion,
        manejarErrorSeleccionFigura,
        estaDeshabilitado,
        esParteDeFigura,
        figuraElegida,
        resaltarCasillas,
        esCasillaResaltada,
        manejarSeleccionMovimiento,
    };
};
