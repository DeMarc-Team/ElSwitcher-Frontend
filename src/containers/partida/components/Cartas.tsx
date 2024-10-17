import { cn } from "@/services/shadcn_lib/utils";

interface CartasProps {
    imgSrc: string;
    rotation: number;
    middle?: boolean;
    altText: string;
    isSelect: boolean;
    automatic_tam?: boolean;
    onClick?: () => void;
}

const Cartas = ({
    imgSrc,
    rotation,
    altText,
    middle = false,
    isSelect = false,
    automatic_tam = true,
    onClick,
}: CartasProps) => {
    let classRotation = "";
    if (rotation > 0) {
        classRotation = `rotate-6`;
    } else if (rotation < 0) {
        classRotation = `-rotate-6`;
    }

    return (
        <button
            className={cn(
                `${middle ? "-mt-5" : ""}`,
                isSelect ? "z-40" : "z-0"
            )}
            onClick={onClick}
        >
            <img
                src={imgSrc}
                className={cn(
                    `rounded-lg border-2 border-black object-contain shadow-md transition-transform duration-300 hover:scale-105 hover:border-indigo-500`,
                    classRotation,
                    isSelect &&
                        "scale-110 border-4 border-indigo-500 transition-all duration-100 hover:scale-110",
                    automatic_tam && "h-60 max-lg:h-auto max-lg:max-h-40"
                )}
                alt={altText}
            />
        </button>
    );
};

export default Cartas;
