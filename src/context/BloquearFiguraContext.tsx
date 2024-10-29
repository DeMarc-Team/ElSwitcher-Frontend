import { Figura } from "@/services/api/ver_tablero";
import React, { createContext, useContext, useState } from "react";

interface BloquearFiguraContextProps {
    idJugadorABloquear: number | undefined;
    existeFigura: string[] | undefined;
    codigoCartaFiguraABloquear: string | undefined;
    figuraSeleccionada: Figura | undefined;
    cartaFiguraABloquearSeleccionada: number | undefined;
    setCodigoCartaFiguraABloquear: (codigo: string | undefined) => void;
    setExisteFigura: (figuras: string[]) => void;
    setFiguraSeleccionada: (figura: Figura | undefined) => void;
    setCartaFiguraABloquearSeleccionada: (carta: number | undefined) => void;
    setIdJugadorABloquear: (id: number | undefined) => void;
    cleanFiguraContexto: () => void;
}

const BloquearFiguraContext = createContext<
    BloquearFiguraContextProps | undefined
>(undefined);

export const BloquearFiguraContextProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [idJugadorABloquear, setIdJugadorABloquear] = useState<
        number | undefined
    >(undefined);
    const [codigoCartaFiguraABloquear, setCodigoCartaFiguraABloquear] =
        useState<string | undefined>(undefined);
    const [existeFigura, setExisteFigura] = useState<string[] | undefined>(
        undefined
    );
    const [figuraSeleccionada, setFiguraSeleccionada] = useState<
        Figura | undefined
    >(undefined);
    const [
        cartaFiguraABloquearSeleccionada,
        setCartaFiguraABloquearSeleccionada,
    ] = useState<number | undefined>(undefined);

    const cleanFiguraContexto = () => {
        setCodigoCartaFiguraABloquear(undefined);
        setFiguraSeleccionada(undefined);
        setCartaFiguraABloquearSeleccionada(undefined);
        setExisteFigura(undefined);
        setIdJugadorABloquear(undefined);
    };

    return (
        <BloquearFiguraContext.Provider
            value={{
                idJugadorABloquear,
                existeFigura,
                codigoCartaFiguraABloquear,
                figuraSeleccionada,
                cartaFiguraABloquearSeleccionada,
                setExisteFigura,
                setCodigoCartaFiguraABloquear,
                setFiguraSeleccionada,
                setIdJugadorABloquear,
                setCartaFiguraABloquearSeleccionada,
                cleanFiguraContexto,
            }}
        >
            {children}
        </BloquearFiguraContext.Provider>
    );
};

export const useBloquearFiguraContext = () => {
    const context = useContext(BloquearFiguraContext);
    if (!context) {
        throw new Error(
            "useBloquearFiguraContext debe ser usado dentro de un BloquearFiguraContextProvider"
        );
    }
    return context;
};
