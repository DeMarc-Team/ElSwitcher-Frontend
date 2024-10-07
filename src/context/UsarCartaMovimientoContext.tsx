import React, { createContext, useContext, useState } from "react";

interface UsarCartaMovimientoContextProps {
    primeraSeleccion: { row: number; col: number } | null;
    segundaSeleccion: { row: number; col: number } | null;
    cartaSeleccionada: number | null;
    codigoCartaMovimiento: string | null;
    setPrimeraSeleccion: (primeraSeleccion: {
        row: number;
        col: number;
    }) => void;
    setSegundaSeleccion: (segundaSeleccion: {
        row: number;
        col: number;
    }) => void;
    setCartaSeleccionada: (cartaSeleccionada: number) => void;
    setCodigoCartaMovimiento: (codigoCartaMovimiento: string) => void;
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

    return (
        <MovimientoContext.Provider
            value={{
                primeraSeleccion,
                segundaSeleccion,
                cartaSeleccionada,
                codigoCartaMovimiento,
                setPrimeraSeleccion,
                setSegundaSeleccion,
                setCartaSeleccionada,
                setCodigoCartaMovimiento,
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
