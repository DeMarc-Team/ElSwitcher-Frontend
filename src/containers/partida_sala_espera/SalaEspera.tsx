import { useParams } from "react-router-dom";
import Room from "./components/Room";
function SalaEspera() {
    const id_partida = useParams().id_partida;
    if (!id_partida) {
        return <p>Id de partida no encontrado</p>;
    }
    return (
        <div className="flex h-[100vh] w-full items-center justify-center">
            <Room
                title="Sala de Espera"
                description="Esperando a que se unan los jugadores, se paciente."
                id_partida={Number(id_partida)}
            />
        </div>
    );
}

export default SalaEspera;
