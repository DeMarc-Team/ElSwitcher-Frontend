import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

export default function CardGanador({
    nombre_ganador,
}: Readonly<{
    nombre_ganador: string;
}>) {
    const navigate = useNavigate();
    confetti({
        particleCount: 150,
        spread: 150,
        origin: { y: 0.6 },
        zIndex: 5,
    });
    return (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-60">
            <Card className="z-10 flex h-56 w-96 flex-col items-center justify-center">
                <CardHeader>
                    <CardTitle>¡El ganador es {nombre_ganador}!</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-xl">
                        🎉 🎉 🎉
                    </CardDescription>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => navigate("/")}>
                        Volver al inicio
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
