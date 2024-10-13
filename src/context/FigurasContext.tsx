//MOVER ESTE ARCHIVO CON EL MERGE
//VER SI SE LO PUEDE INCLUIR A PARTIDA
import React, { createContext, useContext, useState } from "react";

interface UsarCartaFiguraContextProps {
    existeFigura : string[] | null;
    cartaFSeleccionada: string | null;
    setCartaFSeleccionada: (cartaSeleccionada: string) => void;
    setExisteFigura: (existeFigura: string[]) => void;
}

const FiguraContext = createContext<UsarCartaFiguraContextProps | undefined>(undefined);

export const FiguraContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartaFSeleccionada, setCartaFSeleccionada] = useState<string| null>(null);
    const [existeFigura, setExisteFigura] = useState<string []| null>(null);

    return (
        <FiguraContext.Provider
            value={{
                existeFigura,
                cartaFSeleccionada,
                setExisteFigura,
                setCartaFSeleccionada
            }}
        >
            {children}
        </FiguraContext.Provider>
    );
};

export const useFiguraContext = () => {
    const context = useContext(FiguraContext);
    if (!context) {
        throw new Error("useFiguraContext debe ser usado dentro de un FiguraContextProvider");
    }
    return context;
};