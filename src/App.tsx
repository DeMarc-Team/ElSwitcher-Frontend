import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/containers/home/Home";
import SalaEspera from "./containers/partida_sala_espera/SalaEspera";
import Dashboard from "./containers/dashboard/components/Board";

function App() {
    return (
        <div className="px-16 py-5">
            <Router>
                <Routes>
                    <Route 
                        path="/" 
                        element={<Home />} 
                    />
                    <Route
                        path="/partidas/:id_partida/sala-espera"
                        element={<SalaEspera />}
                    />
                    <Route 
                        path="/partidas/dashboard"
                        element={<Dashboard />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
