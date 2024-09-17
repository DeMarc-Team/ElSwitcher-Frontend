import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CardHomeProps {
    title: string;
    description: string;
}

function CardHome (card:CardHomeProps){
    return (
        <Card className="max-w-80 max-h-40 text-center bg-red-400">
            <CardHeader>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="ghost" className="text-black-500 hover:bg-red-800 hover:text-white">
                    Crear
                </Button>
            </CardContent>
        </Card>
    );
};

export default CardHome;
