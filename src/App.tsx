import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/containers/home/Home";
import SalaEspera from "@/containers/partida_sala_espera/SalaEspera";
import Partida from "@/containers/partida/Partida";
import { PartidaWebsocketProvider } from "@/context/PartidaWebsocket";
import { PartidaProvider } from "@/context/PartidaContext";
import { FiguraContextProvider } from "./context/FigurasContext";

function App() {
    return (
        <div className="px-32 max-md:px-10">
            <PartidaWebsocketProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/partidas/:id_partida/sala-espera"
                            element={<SalaEspera />}
                        />
                        <Route
                            path="/partidas/:id_partida"
                            element={
                                <PartidaProvider>
                                    <FiguraContextProvider>
                                        <Partida />
                                    </FiguraContextProvider>
                                </PartidaProvider>
                            }
                        />
                    </Routes>
                </Router>
                <Toaster />
            </PartidaWebsocketProvider>
        </div>
    );
}

export default App;
