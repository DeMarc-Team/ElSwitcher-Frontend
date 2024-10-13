//MOVER ESTE ARCHIVO CON EL MERGE
//VER SI SE LO PUEDE INCLUIR A PARTIDA
import { Figura } from "@/services/api/ver_tablero";
import React, { createContext, useContext, useState } from "react";

interface UsarCartaFiguraContextProps {
    existeFigura: string[] | null;
    cartaFSeleccionada: string | null;
    figuraSeleccionada: Figura | null;
    esParteDeFiguraSeleccionada: Boolean;
    setCartaFSeleccionada: (cartaSeleccionada: string) => void;
    setExisteFigura: (existeFigura: string[]) => void;
    setFiguraSeleccionada: (figuraSeleccionada: Figura | null) => void;
    setEsParteDeFiguraSeleccionada: (
        esParteDeFiguraSeleccionada: Boolean
    ) => void;
}

const FiguraContext = createContext<UsarCartaFiguraContextProps | undefined>(
    undefined
);

export const FiguraContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [cartaFSeleccionada, setCartaFSeleccionada] = useState<string | null>(
        null
    );
    const [existeFigura, setExisteFigura] = useState<string[] | null>(null);
    const [figuraSeleccionada, setFiguraSeleccionada] = useState<Figura | null>(
        null
    );
    const [esParteDeFiguraSeleccionada, setEsParteDeFiguraSeleccionada] =
        useState<Boolean>(false);

    return (
        <FiguraContext.Provider
            value={{
                existeFigura,
                cartaFSeleccionada,
                figuraSeleccionada,
                esParteDeFiguraSeleccionada,
                setExisteFigura,
                setCartaFSeleccionada,
                setFiguraSeleccionada,
                setEsParteDeFiguraSeleccionada,
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
