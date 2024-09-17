import Room from "./components/Room";
function Waiting_room() {
    return (
        <div className="flex h-[100vh] w-full items-center justify-center">
            <Room
                title="Esperando a jugadores"
                description="Los jugadores van a unirse en breve, se paciente"
            />
        </div> 
    );
}

export default Waiting_room;
