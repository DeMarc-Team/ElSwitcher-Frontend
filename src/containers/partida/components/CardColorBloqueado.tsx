import { Card, CardContent, CardTitle } from "@/components/ui/card";

const COLORES: string[] = ["red", "green", "blue", "yellow"];

export default function CardColorBloqueado() {
    //const colorBloqueado : number = ObtenerColorBloqueado();
    const colorBloqueado = 1;
    return (
        <Card className="border-2 border-black bg-yellow-100 p-4">
            <CardTitle className="m-1">COLOR BLOQUEADO</CardTitle>
            <CardContent className="flex flex-row items-center justify-center gap-3 p-0">
                <div
                    className={`flex h-20 w-20 rounded-full border-2 border-dashed border-black bg-${COLORES[colorBloqueado - 1]}-400`}
                ></div>
            </CardContent>
        </Card>
    );
}
