import { cn } from "@/services/shadcn_lib/utils";

interface CartasProps {
    imgSrc: string;
    rotation: number;
    middle?: boolean;
    altText: string;
}

const Cartas = ({ imgSrc, rotation, altText, middle = false }: CartasProps) => {
    let classRotation = "";
    if (rotation > 0) {
        classRotation = `rotate-6`;
    } else if (rotation < 0) {
        classRotation = `-rotate-6`;
    }

    return (
        <button
            className={cn(`${middle ? "-mt-3" : ""}`)}
            // onMouseEnter={() => playSound(click)} // Ruta al archivo de sonido
        >
            <img
                src={imgSrc}
                className={cn(
                    `h-50 max-lg:w-30 z-0 w-40 rounded-lg border-2 border-black shadow-md transition-transform duration-300 hover:z-20 hover:scale-110 hover:border-indigo-500 max-lg:h-40`,
                    classRotation
                )}
                alt={altText}
            />
        </button>
    );
};

export default Cartas;
