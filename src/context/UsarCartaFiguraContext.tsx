import { Figura } from "@/services/api/ver_tablero";
import React, { createContext, useContext, useState } from "react";

interface UsarCartaFiguraContextProps {
    estoyBloqueando: boolean;
    idJugadorABloquear: number | undefined;
    existeFigura: string[] | null;
    codigoCartaFigura: string | undefined;
    figuraSeleccionada: Figura | null;
    cartaFiguraSeleccionada: number | undefined;
    setCodigoCartaFigura: (codigoCartaFigura: string | undefined) => void;
    setExisteFigura: (existeFigura: string[]) => void;
    setFiguraSeleccionada: (figuraSeleccionada: Figura | null) => void;
    setCartaFiguraSeleccionada: (
        cartaFiguraSeleccionada: number | undefined
    ) => void;
    setEstoyBloqueando: (estoyBloqueando: boolean) => void;
    setIdJugadorABloquear: (idJugadorABloquear: number | undefined) => void;
    cleanFiguraContexto: () => void;
}

const FiguraContext = createContext<UsarCartaFiguraContextProps | undefined>(
    undefined
);

export const FiguraContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [codigoCartaFigura, setCodigoCartaFigura] = useState<
        string | undefined
    >(undefined);
    const [existeFigura, setExisteFigura] = useState<string[] | null>(null);
    const [figuraSeleccionada, setFiguraSeleccionada] = useState<Figura | null>(
        null
    );
    const [cartaFiguraSeleccionada, setCartaFiguraSeleccionada] = useState<
        number | undefined
    >(undefined);

    const [estoyBloqueando, setEstoyBloqueando] = useState<boolean>(false);
    const [idJugadorABloquear, setIdJugadorABloquear] = useState<
        number | undefined
    >(undefined);

    const cleanFiguraContexto = () => {
        setCodigoCartaFigura(undefined);
        setFiguraSeleccionada(null);
        setCartaFiguraSeleccionada(undefined);
    };

    return (
        <FiguraContext.Provider
            value={{
                estoyBloqueando,
                idJugadorABloquear,
                existeFigura,
                codigoCartaFigura,
                figuraSeleccionada,
                cartaFiguraSeleccionada,
                setExisteFigura,
                setCodigoCartaFigura,
                setFiguraSeleccionada,
                setCartaFiguraSeleccionada,
                setEstoyBloqueando,
                setIdJugadorABloquear,
                cleanFiguraContexto,
            }}
        >
            {children}
        </FiguraContext.Provider>
    );
};

export const useFiguraContext = () => {
    const context = useContext(FiguraContext);
    if (!context) {
        throw new Error(
            "useFiguraContext debe ser usado dentro de un FiguraContextProvider"
        );
    }
    return context;
};
