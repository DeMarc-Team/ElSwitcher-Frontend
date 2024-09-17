import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loading from "./Loading";

interface CardHomeProps {
    title: string;
    description: string;
}

const Room: React.FC<CardHomeProps> = ({ title, description }) => {
    return (
        <Card className="w-96 text-center">
            <CardHeader>
                <CardTitle>{title}</CardTitle><Loading/>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button>Iniciar partida</Button>
            </CardContent>
        </Card>
    );
};

export default Room;