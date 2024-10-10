import React, { createContext, useContext, useState } from "react";

interface UsarCartaMovimientoContextProps {
    primeraSeleccion: { row: number; col: number } | null;
    segundaSeleccion: { row: number; col: number } | null;
    cartaSeleccionada: number | undefined;
    codigoCartaMovimiento: string | null;
    pasarTurno: boolean | null;
    parcialmenteUsada: boolean | null;
    rotVec: { x: number; y: number } | null;
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
    setCartaSeleccionada: (cartaSeleccionada: number | undefined) => void;
    setCodigoCartaMovimiento: (codigoCartaMovimiento: string | null) => void;
    setPasarTurno: (pasarTurno: boolean | null) => void;
    setParcialmenteUsada: (parcialmenteUsada: boolean | null) => void;
    setRotVec: (rotVec: { x: number; y: number } | null) => void;
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
    const [cartaSeleccionada, setCartaSeleccionada] = useState<
        number | undefined
    >(undefined);
    const [codigoCartaMovimiento, setCodigoCartaMovimiento] = useState<
        string | null
    >(null);
    const [pasarTurno, setPasarTurno] = useState<boolean | null>(true);
    const [parcialmenteUsada, setParcialmenteUsada] = useState<boolean | null>(
        null
    );
    const [rotVec, setRotVec] = useState<{ x: number; y: number } | null>(null);

    return (
        <MovimientoContext.Provider
            value={{
                primeraSeleccion,
                segundaSeleccion,
                cartaSeleccionada,
                codigoCartaMovimiento,
                pasarTurno,
                parcialmenteUsada,
                rotVec,
                setPrimeraSeleccion,
                setSegundaSeleccion,
                setCartaSeleccionada,
                setCodigoCartaMovimiento,
                setPasarTurno,
                setParcialmenteUsada,
                setRotVec,
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
