import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/containers/home/Home";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/espera/:id_partida'/>
            </Routes>
        </Router>
    );
}

export default App;