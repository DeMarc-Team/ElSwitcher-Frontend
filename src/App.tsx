import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/containers/home/Home";
import SalaEspera from "@/containers/partida_sala_espera/SalaEspera";
import Partida from "@/containers/partida/Partida";
import { PartidaProvider } from "./context/PartidaContext";

function App() {
    return (
        <div className="px-32 max-md:px-10">
            <PartidaProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route
                            path="/partidas/:id_partida/sala-espera"
                            element={<SalaEspera />}
                        />
                        <Route
                            path="/partidas/:id_partida"
                            element={<Partida />}
                        />
                    </Routes>
                </Router>
                <Toaster />
            </PartidaProvider>
        </div>
    );
}

export default App;
