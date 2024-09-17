import React from "react";
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

const Room: React.FC<CardHomeProps> = ({ title, description }) => {
    return (
        <Card className="w-96 text-center">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button>Presiona aquí para sacarte la ansiedad</Button>
            </CardContent>
        </Card>
    );
};

export default Room;