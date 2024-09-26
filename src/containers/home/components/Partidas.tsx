import { ScrollArea } from "@/components/ui/scroll-area";
import FormUnirse from "./FormUnirse";
import { ObtenerPartidas, type Partida } from "@/services/api/obtener_partidas";
import { useEffect, useState } from "react";

function Partidas() {
    const [partidas, setPartidas] = useState<Partida[]>([]);

    useEffect(() => {
        fetchPartidas();
        const intervalId = setInterval(async () => {
            fetchPartidas();
        }, 2000); // Son ms

        // Limpia el intervalo cuando ya no se renderiza el home
        return () => clearInterval(intervalId);
    }, []);

    const fetchPartidas = async () => {
        try {
            const data = await ObtenerPartidas();
            setPartidas(data);
        } catch (err) {
            console.error("No se pudieron obtener las partidas.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <p className="mb-2 text-center text-lg font-black">
                Lista de partidas:
            </p>
                <ScrollArea className="h-96 w-full overflow-auto rounded-md border-2 border-black bg-green-400">
                    <div className="flex flex-col space-y-4 p-4">
                        <ul>
                            {partidas.map((partida) => (
                                <li key={partida.id}>
                                    <FormUnirse
                                        partidaId={partida.id}
                                        partidaName={partida.nombre_partida}
                                    />
                                </li>
                            ))}
                            {partidas.length === 0 && (
                                <div className="flex h-80 items-center justify-center">
                                    <p className="text-center opacity-65">
                                        No hay partidas creadas.
                                    </p>
                                </div>
                            )}
                        </ul>
                    </div>
                </ScrollArea>
        </div>
    );
}

export default Partidas;
