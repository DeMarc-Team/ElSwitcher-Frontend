import { createContext, useContext, useState, ReactNode } from "react";

interface TurnoContextType {
    turnoId: number | null;
    setTurnoId: (id: number) => void;
}

const TurnoContext = createContext<TurnoContextType | undefined>(undefined);

export const TurnoProvider = ({
    children,
    value,
}: {
    children: ReactNode;
    value: TurnoContextType; // Asegúrate de que el tipo coincide
}) => {
    const [turnoId, setTurnoId] = useState<number | null>(
        value.turnoId || null
    );

    return (
        <TurnoContext.Provider value={{ turnoId, setTurnoId }}>
            {children}
        </TurnoContext.Provider>
    );
};

export const useTurno = () => {
    const context = useContext(TurnoContext);
    if (!context) {
        throw new Error("useTurno debe usarse dentro de un TurnoProvider");
    }
    return context;
};
