import { Figura } from "@/services/api/ver_tablero";
import React, { createContext, useContext, useState } from "react";

interface UsarCartaFiguraContextProps {
    existeFigura: string[] | null;
    cartaFSeleccionada: string | undefined;
    figuraSeleccionada: Figura | null;
    cartaFiguraIndexSeleccionada: number | undefined;
    setCartaFSeleccionada: (cartaSeleccionada: string | undefined) => void;
    setExisteFigura: (existeFigura: string[]) => void;
    setFiguraSeleccionada: (figuraSeleccionada: Figura | null) => void;
    setCartaFiguraIndexSeleccionada: (
        cartaFiguraIndexSeleccionada: number | undefined
    ) => void;
    cleanFiguraContexto: () => void;
}

const FiguraContext = createContext<UsarCartaFiguraContextProps | undefined>(
    undefined
);

export const FiguraContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [cartaFSeleccionada, setCartaFSeleccionada] = useState<
        string | undefined
    >(undefined);
    const [existeFigura, setExisteFigura] = useState<string[] | null>(null);
    const [figuraSeleccionada, setFiguraSeleccionada] = useState<Figura | null>(
        null
    );
    const [cartaFiguraIndexSeleccionada, setCartaFiguraIndexSeleccionada] =
        useState<number | undefined>(undefined);

    const cleanFiguraContexto = () => {
        setCartaFSeleccionada(undefined);
        setFiguraSeleccionada(null);
        setCartaFiguraIndexSeleccionada(undefined);
    };

    return (
        <FiguraContext.Provider
            value={{
                existeFigura,
                cartaFSeleccionada,
                figuraSeleccionada,
                setExisteFigura,
                setCartaFSeleccionada,
                setFiguraSeleccionada,
                cleanFiguraContexto,
                cartaFiguraIndexSeleccionada,
                setCartaFiguraIndexSeleccionada,
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
