import { useEffect, useState } from "react";
import FormUnirse from "./FormUnirse";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ObtenerPartidas, type Partida } from "@/services/api/obtener_partidas";
import { useWebSocketListaPartidas } from "@/services/websockets/websockets_lista_partidas";
function Partidas() {
    const [partidas, setPartidas] = useState<Partida[]>([]);
    // const { triggerActualizaPartidas } = useWebSocketListaPartidas();

    // useEffect(() => {
    //     fetchPartidas();
    // }, [triggerActualizaPartidas]);

    // const fetchPartidas = async () => {
    //     try {
    //         const data = await ObtenerPartidas();
    //         setPartidas(data);
    //     } catch (err) {
    //         console.error("No se pudieron obtener las partidas.");
    //     }
    // };

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
        <div
            className="flex flex-col items-center justify-center pt-10"
            id="listapartidas"
        >
            <p className="mb-2 text-center text-2xl font-black uppercase">
                Lista de partidas
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
