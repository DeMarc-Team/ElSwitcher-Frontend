import { createContext, useContext, useState, ReactNode } from "react";

interface TurnoContextType {
    turnoId: number | null;
    setTurnoId: (id: number) => void;
}

const TurnoContext = createContext<TurnoContextType | undefined>(undefined);

export const TurnoProvider = ({ children }: { children: ReactNode }) => {
    const [turnoId, setTurnoId] = useState<number | null>(null);

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
