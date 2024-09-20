import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/containers/home/Home";

function App() {
    return (
        <div className="px-16 py-5">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/espera/:id_partida" />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
