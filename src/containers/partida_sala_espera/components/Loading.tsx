import { useState, useEffect } from "react";

const Loading = () => {
    const [dots, setDots] = useState(".");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => {
                // Alterna entre 1, 2 y 3 puntos
                if (prevDots === "...") return ".";
                return prevDots + ".";
            });
        }, 500); // Actualiza cada 500 ms

        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, []);

    return (
        <small className="relative -top-6 h-2 select-none">
            <span className="pt-0 text-4xl font-extrabold text-black">
                {dots}
            </span>
        </small>
    );
};

export default Loading;
