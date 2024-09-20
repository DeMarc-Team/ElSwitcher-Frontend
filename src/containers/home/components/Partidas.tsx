import { ScrollArea } from "@/components/ui/scroll-area";
import FormUnirse from "./FormUnirse";
import { ObtenerPartidas, type Partida } from "@/services/api/ObtenerPartidas";
import { useEffect, useState } from "react";

function Partidas() {
    const [partidas, setPartidas] = useState<Partida[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPartidas = async () => {
            try {
                const data = await ObtenerPartidas();
                setPartidas(data);
            } catch (err) {
                setError("No se pudieron obtener las partidas.");
            }
        };

        fetchPartidas();

        const intervalId = setInterval(() => {
            fetchPartidas();
        }, 7000); // Son ms

        // Limpia el intervalo cuando ya no se renderiza el home
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <p className="mb-2 text-center text-lg font-black">
                Lista de partidas:
            </p>
            {error ? (
                <p className="opacity-65">{error}</p>
            ) : (
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
                        </ul>
                    </div>
                </ScrollArea>
            )}
        </div>
    );
}

export default Partidas;
