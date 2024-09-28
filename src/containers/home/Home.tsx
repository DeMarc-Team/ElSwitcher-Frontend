import CrearPartida from "./components/CrearPartida";
import { ChevronDown } from "lucide-react";
import Partidas from "./components/Partidas";
import HeaderHome from "./components/HeaderHome";

function Home() {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
                <HeaderHome />
                <ChevronDown className="mx-auto h-10 w-10 animate-bounce text-black" />
            </div>
            <Partidas />
            <CrearPartida />
            <p className="py-16 text-center">
                Desarollado por{" "}
                <span className="font-bold underline">DEMARC-TEAM</span>
            </p>
        </div>
    );
}

export default Home;
