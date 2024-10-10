import React, { createContext, useContext, useState } from "react";

interface UsarCartaMovimientoContextProps {
    primeraSeleccion: { row: number; col: number } | null;
    segundaSeleccion: { row: number; col: number } | null;
    cartaSeleccionada: number | null;
    codigoCartaMovimiento: string | null;
    pasarTurno: boolean | null;
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
    setCartaSeleccionada: (cartaSeleccionada: number | null) => void;
    setCodigoCartaMovimiento: (codigoCartaMovimiento: string) => void;
    setPasarTurno: (pasarTurno: boolean) => void;
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
    const [cartaSeleccionada, setCartaSeleccionada] = useState<number | null>(
        null
    );
    const [codigoCartaMovimiento, setCodigoCartaMovimiento] = useState<
        string | null
    >(null);
    const [pasarTurno, setPasarTurno] = useState<boolean | null>(true);

    return (
        <MovimientoContext.Provider
            value={{
                primeraSeleccion,
                segundaSeleccion,
                cartaSeleccionada,
                codigoCartaMovimiento,
                pasarTurno,
                setPrimeraSeleccion,
                setSegundaSeleccion,
                setCartaSeleccionada,
                setCodigoCartaMovimiento,
                setPasarTurno,
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
