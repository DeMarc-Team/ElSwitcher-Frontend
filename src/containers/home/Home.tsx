import CrearPartida from "./components/CrearPartida";
import { ChevronDown } from "lucide-react";
import Partidas from "./components/Partidas";
import HeaderHome from "./components/HeaderHome";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Home() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash === "#listapartidas") {
            const element = document.getElementById("listapartidas");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);
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
