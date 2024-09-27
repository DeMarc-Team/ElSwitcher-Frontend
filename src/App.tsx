import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/containers/home/Home";
import SalaEspera from "./containers/partida_sala_espera/SalaEspera";
import Dashboard from "./containers/dashboard/Dashboard";

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
                        path="/partidas/dashboard/:id_partida"
                        element={<Dashboard/>}
                    />
                </Routes>
            </Router>
            <Toaster />
        </div>
    );
}

export default App;
