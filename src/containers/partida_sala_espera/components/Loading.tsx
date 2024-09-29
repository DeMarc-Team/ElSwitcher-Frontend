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
        <p className="-mt-5 mb-4 !h-[2px]">
            <span className="pt-0 text-4xl font-extrabold text-black">
                {dots}
            </span>
        </p>
    );
};

export default Loading;
