import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/containers/home/Home";
import SalaEspera from "@/containers/partida_sala_espera/SalaEspera";
import Partida from "@/containers/partida/Partida";

function App() {
    return (
        <div className="px-32 py-5 max-md:px-10">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/partidas/:id_partida/sala-espera"
                        element={<SalaEspera />}
                    />
                    <Route path="/partidas/:id_partida" element={<Partida />} />
                </Routes>
            </Router>
            <Toaster />
        </div>
    );
}

export default App;
