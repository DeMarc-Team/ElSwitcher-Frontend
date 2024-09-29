import { useParams } from "react-router-dom";
import Board from "./components/Board";

function Partida() {
    const id_partida = useParams().id_partida;
    if (!id_partida) {
        return <p>Id de partida no encontrado</p>;
    }
    return (
        <div className="flex h-[100vh] w-full items-center justify-center">
            <Board id_partida={Number(id_partida)} />
        </div>
    );
}

export default Partida;
