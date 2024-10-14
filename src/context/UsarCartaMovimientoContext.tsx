import React, { createContext, useContext, useState } from "react";
import { Casilla } from "@/services/api/jugar_carta_movimiento";

interface UsarCartaMovimientoContextProps {
    primeraSeleccion: { row: number; col: number } | null;
    segundaSeleccion: { row: number; col: number } | null;
    cartaMovimientoSeleccionada: number | undefined;
    codigoCartaMovimiento: string | null;
    pasarTurno: boolean | null;
    parcialmenteUsada: boolean | null;
    rotVec: { x: number; y: number } | null;
    casillasMovimientos: Casilla[];
    setPrimeraSeleccion: (
        primeraSeleccion: {
            row: number;
            col: number;
        } | null
    ) => void;
    setSegundaSeleccion: (
        segundaSeleccion: {
            row: number;
            col: number;
        } | null
    ) => void;
    setCartaMovimientoSeleccionada: (
        cartaMovimientoSeleccionada: number | undefined
    ) => void;
    setCodigoCartaMovimiento: (codigoCartaMovimiento: string | null) => void;
    setPasarTurno: (pasarTurno: boolean | null) => void;
    setParcialmenteUsada: (parcialmenteUsada: boolean | null) => void;
    setRotVec: (rotVec: { x: number; y: number } | null) => void;
    setCasillasMovimientos: (casillasMovimientos: Casilla[]) => void;
    cleanMovimientoContexto: () => void;
}

const MovimientoContext = createContext<
    UsarCartaMovimientoContextProps | undefined
>(undefined);

export const MovimientoContextProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [primeraSeleccion, setPrimeraSeleccion] = useState<{
        row: number;
        col: number;
    } | null>(null);
    const [segundaSeleccion, setSegundaSeleccion] = useState<{
        row: number;
        col: number;
    } | null>(null);
    const [cartaMovimientoSeleccionada, setCartaMovimientoSeleccionada] =
        useState<number | undefined>(undefined);
    const [codigoCartaMovimiento, setCodigoCartaMovimiento] = useState<
        string | null
    >(null);
    const [pasarTurno, setPasarTurno] = useState<boolean | null>(true);
    const [parcialmenteUsada, setParcialmenteUsada] = useState<boolean | null>(
        null
    );
    const [rotVec, setRotVec] = useState<{ x: number; y: number } | null>(null);
    const [casillasMovimientos, setCasillasMovimientos] = useState<Casilla[]>(
        []
    );

    const cleanMovimientoContexto = () => {
        setCodigoCartaMovimiento(null);
        setCartaMovimientoSeleccionada(undefined);
        setPrimeraSeleccion(null);
        setSegundaSeleccion(null);
        setCasillasMovimientos([]);
        setPasarTurno(null);
    };

    return (
        <MovimientoContext.Provider
            value={{
                primeraSeleccion,
                segundaSeleccion,
                cartaMovimientoSeleccionada,
                codigoCartaMovimiento,
                pasarTurno,
                parcialmenteUsada,
                rotVec,
                casillasMovimientos,
                setPrimeraSeleccion,
                setSegundaSeleccion,
                setCartaMovimientoSeleccionada,
                setCodigoCartaMovimiento,
                setPasarTurno,
                setParcialmenteUsada,
                setRotVec,
                setCasillasMovimientos,
                cleanMovimientoContexto,
            }}
        >
            {children}
        </MovimientoContext.Provider>
    );
};

export const useMovimientoContext = () => {
    const context = useContext(MovimientoContext);
    if (!context) {
        throw new Error(
            "useMovimientoContext debe ser usado dentro de un MovimientoContextProvider"
        );
    }
    return context;
};
