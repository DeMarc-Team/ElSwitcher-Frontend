import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/containers/home/Home";
import SalaEspera from "@/containers/partida_sala_espera/SalaEspera";
import Partida from "@/containers/partida/Partida";
import { PartidaWebsocketProvider } from "@/context/PartidaWebsocket";
import { PartidaProvider } from "@/context/PartidaContext";
import { MovimientoContextProvider } from "@/context/UsarCartaMovimientoContext";
import { FiguraContextProvider } from "@/context/UsarCartaFiguraContext";
import { useEffect, useState } from "react";

interface CtrlAComponentProps {
    setIsCtrlA: React.Dispatch<React.SetStateAction<boolean>>;
}

const CtrlAComponent: React.FC<CtrlAComponentProps> = ({ setIsCtrlA }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Verifica si Ctrl + A fue presionado
            if (event.ctrlKey && event.key === 'a') {
                event.preventDefault(); 
                setIsCtrlA(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [setIsCtrlA]);
    return null;
};

function App() {
    const [isCtrlA, setIsCtrlA] = useState(false);

    return (
        <div className={`px-32 max-md:px-10 ${isCtrlA ? 'emoji-cursor' : ''}`}>
            <CtrlAComponent setIsCtrlA={setIsCtrlA} />
            <PartidaWebsocketProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/partidas/:id_partida/sala-espera" element={<SalaEspera />} />
                        <Route path="/partidas/:id_partida" element={
                            <PartidaProvider>
                                <MovimientoContextProvider>
                                    <FiguraContextProvider>
                                        <Partida />
                                    </FiguraContextProvider>
                                </MovimientoContextProvider>
                            </PartidaProvider>
                        } />
                    </Routes>
                </Router>
                <Toaster />
            </PartidaWebsocketProvider>
        </div>
    );
}

export default App;