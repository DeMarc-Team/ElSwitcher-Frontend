import React from "react";
import click from "@/components/sounds/click-21156.mp3"
interface CartasProps {
    imgSrc: string;
    rotation: number;
    altText: string;
}

// Función para reproducir sonido
const playSound = (soundFile: string) => {
    const audio = new Audio(soundFile);
    audio.play();
};

const Cartas = ({ imgSrc, rotation, altText }: CartasProps) => {
    return (
        <div
            className="perspective-1000"
            onMouseEnter={() => playSound(click)} // Ruta al archivo de sonido
        >
            <img
                src={imgSrc}
                className={`w-30 h-40 rounded-lg border-2 border-black shadow-md hover:border-indigo-500 hover:scale-110 transition-transform duration-300`}
                style={{
                    transform: `rotate(${rotation}deg)`,
                }}
                alt={altText}
            />
        </div>
    );
};

export default Cartas;