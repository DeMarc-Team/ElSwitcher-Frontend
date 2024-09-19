import { ScrollArea } from "@/components/ui/scroll-area"
import FormUnirse from "./FormUnirse";
import { obtenerPartidas,type Partida } from "@/services/api/obtener-partidas";
import { useEffect, useState } from "react";

function Partidas () {
    const [partidas, setPartidas] = useState<Partida[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPartidas = async () => {
            try {
                const data = await obtenerPartidas();
                setPartidas(data);
            } catch (err) {
                setError('Error al cargar las partidas.');
            }
        };

        fetchPartidas();

        const intervalId = setInterval(() => {fetchPartidas();}, 7000); // Son ms

      // Limpia el intervalo cuando ya no se renderiza el home
      return () => clearInterval(intervalId);
    }, []);

    if (error) {
        return <p>{error}</p>;
    }
    return (
        <div>
            <ScrollArea className="w-96 h-48 overflow-auto rounded-md border bg-red-400 ">
                <p className="text-center text-lg font-black">Unirse a una partida</p>
                <div className="flex flex-col space-y-4 p-4">
                    <ul>
                        {partidas.map((partida) => (
                            <li key={partida.id}>                                
                                    <FormUnirse partidaId={partida.id} partidaName={partida.nombre_partida}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </ScrollArea>
        </div>
    );
};

export default Partidas;

