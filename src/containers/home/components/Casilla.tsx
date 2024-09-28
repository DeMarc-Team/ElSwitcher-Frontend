import { cn } from "@/services/shadcn_lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const casillaVariants = cva(
    "absolute h-20 w-20 rounded-lg border-2 border-black shadow-lg",
    {
        variants: {
            variant: {
                green: "bg-green-400",
                red: "bg-red-400",
                blue: "bg-blue-400",
                yellow: "bg-yellow-400",
            },
        },
    }
);

interface CasillaProps extends VariantProps<typeof casillaVariants> {
    classname?: string;
}

export default function Casilla({
    variant,
    classname,
}: Readonly<CasillaProps>) {
    return (
        <div
            className={cn(
                "absolute h-20 w-20 rounded-lg border-2 border-black shadow-lg",
                casillaVariants({ variant }),
                classname
            )}
        />
    );
}
