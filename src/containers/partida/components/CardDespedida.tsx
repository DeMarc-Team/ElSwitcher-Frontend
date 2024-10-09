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

type CardProps = {
    nombre: string;
    isGanador: boolean;
};

const CardDespedida: React.FC<CardProps> = ({ nombre, isGanador }) => {
    const navigate = useNavigate();

    // Definir los mensajes según el estado
    const title = isGanador
        ? `¡Ganaste ${nombre}!`
        : `Lo siento, ${nombre}. ¡Mejor suerte la próxima vez!`;
    const description = isGanador ? "🎉 🎉 🎉" : "😢 😢 😢";

    // Mostrar confetti solo si es ganador
    if (isGanador) {
        confetti({
            particleCount: 150,
            spread: 150,
            origin: { y: 0.6 },
            zIndex: 5,
        });
    }

    return (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-60">
            <Card className="z-10 flex h-56 w-96 flex-col items-center justify-center">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-xl">
                        {description}
                    </CardDescription>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => navigate("/#listapartidas")}>
                        Volver al inicio
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CardDespedida;
