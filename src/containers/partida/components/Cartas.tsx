import { cn } from "@/services/shadcn_lib/utils";

interface CartasProps {
    imgSrc: string;
    rotation: number;
    middle?: boolean;
    altText: string;
    isSelect: boolean;
    onClick?: () => void;
}

const Cartas = ({
    imgSrc,
    rotation,
    altText,
    middle = false,
    isSelect = false,
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
                    `h-50 max-lg:w-30 w-40 rounded-lg border-2 border-black shadow-md transition-transform duration-300 hover:scale-105 hover:border-indigo-500 max-lg:h-40`,
                    classRotation,
                    isSelect &&
                        "scale-110 border-4 border-indigo-500 transition-all duration-100 hover:scale-110"
                )}
                alt={altText}
            />
        </button>
    );
};

export default Cartas;
