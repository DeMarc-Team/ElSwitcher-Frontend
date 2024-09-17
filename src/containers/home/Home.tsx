import { Link } from "react-router-dom";
import gameLogo from "../../components/assets/logo-juego.jpg"
import Partidas from "./components/Partidas";

function Home() {
    return (
        <><div>
            <h1 className="flex justify-center font-extrabold text-xl m-4 font-black">
                Bienvenido a : "El Switcher"
            </h1> 
        </div>
        <div className="flex justify-center">
            <Link to="https://drive.google.com/file/d/1NUPVsKq70hufAcZ-rBdqREBWOaAFtopx/view">
                <img 
                    src={gameLogo} 
                    className="m-5 h-60 p-6 transition-filter duration-300 hover:filter hover:drop-shadow-[0_0_3em_rgb(128,77,0,0.8)]"
                    alt="Game logo"
                />
            </Link>
        </div>
        <body className="flex justify-center space-x-20" >
            <Partidas/>
        </body>
        </>
    );
}

export default Home;
