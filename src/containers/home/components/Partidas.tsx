import { useEffect, useState } from "react";
import FormUnirse from "./FormUnirse";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ObtenerPartidas, type Partida } from "@/services/api/obtener_partidas";
import { useWebSocketListaPartidas } from "@/services/websockets/websockets_lista_partidas";
import { Input } from "@/components/ui/input"

function Partidas() {
    const [partidas, setPartidas] = useState<Partida[]>([]);
    const { triggerActualizaPartidas } = useWebSocketListaPartidas();
    const [filtroPorNombre, setFiltroPorNombre] = useState("");
    const [partidasFiltradas, setPartidasFiltradas] = useState<Partida[]>([]);

    useEffect(() => {
        fetchPartidas();
    }, [triggerActualizaPartidas]);

    useEffect(() => {
        filtrarPartidas(filtroPorNombre);
    }, [filtroPorNombre, partidas]);

    const fetchPartidas = async () => {
        try {
            const data = await ObtenerPartidas();
            setPartidas(data);
            setPartidasFiltradas(data);
        } catch (err) {
            console.error("No se pudieron obtener las partidas.");
        }
    };

    const filtrarPartidas = async (filtroDeFuncion: string) => {
        if (filtroDeFuncion === "") {
            setPartidasFiltradas(partidas);
        } else {
            const listaAux = partidas.filter((partida) =>
                partida.nombre_partida.toLowerCase().includes(filtroDeFuncion.toLowerCase())
            );
            setPartidasFiltradas(listaAux);
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-center pt-10"
            id="listapartidas"
        >
            <p className="mb-2 text-center text-2xl font-black uppercase">
                Lista de partidas
            </p>
            <div className="flex max-w-sm items-center m-4">
                <Input 
                    placeholder="Filtrar por nombre" 
                    value={filtroPorNombre} 
                    onChange={(e) => setFiltroPorNombre(e.target.value)} 
                />
            </div>
            <ScrollArea className="h-96 w-full overflow-auto rounded-md border-2 border-black bg-green-400">
                <div className="flex flex-col space-y-4 p-4">
                    <ul>
                        {partidasFiltradas.map((partida) => (
                            <li key={partida.id}>
                                <FormUnirse
                                    partidaId={partida.id}
                                    partidaName={partida.nombre_partida}
                                />
                            </li>
                        ))}
                        {partidasFiltradas.length === 0 && (
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
