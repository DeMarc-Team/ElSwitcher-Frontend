import { useEffect, useState } from "react";
import FormUnirse from "./FormUnirse";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ObtenerPartidas, type Partida } from "@/services/api/obtener_partidas";
import { useWebSocketListaPartidas } from "@/services/websockets/websockets_lista_partidas";
import FiltroCantJugadores from "./FiltroCantJugadores";

function Partidas() {
    const [partidas, setPartidas] = useState<Partida[]>([]);
    const [partidasFiltradas, setPartidasFiltradas] = useState<
        Partida[]
    >([]);
    const [filtrosActivosCantJugadores, setFiltrosActivosCantJugadores] =
        useState<number[]>([]); // Estado para saber que checkboxes están activos
    const { triggerActualizaPartidas } = useWebSocketListaPartidas();

    useEffect(() => {
        fetchPartidas();
    }, [triggerActualizaPartidas]);

    const fetchPartidas = async () => {
        try {
            const data = await ObtenerPartidas();
            console.log(data)
            setPartidas(data);
            setPartidasFiltradas(data);
        } catch (err) {
            console.error("No se pudieron obtener las partidas.");
        }
    };

    useEffect(() => {
        filtrarPartidas();
    }, [filtrosActivosCantJugadores]);

    const filtrarPartidas = () => {
        if (filtrosActivosCantJugadores.length === 0) {
            // Si no hay filtros seleccionados, mostrar todas las partidas
            setPartidasFiltradas(partidas);
        } else {
            const listaAux = partidas.filter((partida) =>
                filtrosActivosCantJugadores.includes(partida.numero_de_jugadores)
            );
            setPartidasFiltradas(listaAux);
        }
    };

    const manejarFiltroCantJugadores = (cantidad: number) => {
        setFiltrosActivosCantJugadores((prevFiltros) => {
            if (prevFiltros.includes(cantidad)) {
                return prevFiltros.filter((filtro) => filtro !== cantidad);
            } else {
                return prevFiltros.concat(cantidad);
            }
        });
    };

    return (
        <div
            className="flex flex-col items-center justify-center pt-10"
            id="listapartidas"
        >
            <p className="mb-2 text-center text-2xl font-black uppercase">
                Lista de partidas
            </p>

            <FiltroCantJugadores
                filtros={filtrosActivosCantJugadores}
                manejarFiltro={manejarFiltroCantJugadores}
            />

            <ScrollArea className="h-96 w-full overflow-auto rounded-md border-2 border-black bg-green-400">
                <div className="flex flex-col space-y-4 p-4">
                    <ul>
                        {partidasFiltradas.map((partida) => (
                            <li key={partida.id}>
                                <FormUnirse
                                    partidaId={partida.id}
                                    partidaName={partida.nombre_partida}
                                    partidaJugadores={
                                        partida.numero_de_jugadores
                                    }
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
