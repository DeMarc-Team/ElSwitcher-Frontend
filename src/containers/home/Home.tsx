import { Link } from "react-router-dom";
import gameLogo from "../../components/assets/logo-juego.jpg";
import Partidas from "./components/Partidas";

function Home() {
    return (
        <div className="flex flex-col gap-10">
            <div>
                <h1 className="m-4 flex justify-center text-3xl font-extrabold">
                    Bienvenido a "El Switcher"
                </h1>
            </div>
            <hr className="border-black" />
            <Partidas />
            <hr className="border-black" />
            <div className="flex flex-col items-center justify-center">
                <p className="text-center font-bold">REGLAS:</p>
                <Link to="https://drive.google.com/file/d/1NUPVsKq70hufAcZ-rBdqREBWOaAFtopx/view">
                    <img
                        src={gameLogo}
                        className="transition-filter m-5 h-60 p-6 duration-300 hover:drop-shadow-[0_0_3em_rgb(128,77,0,0.8)] hover:filter"
                        alt="Game logo"
                    />
                </Link>
            </div>
            <hr className="border-black" />
        </div>
    );
}

export default Home;
