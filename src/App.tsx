import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/containers/home/Home";
import Waiting_room from "./containers/waiting_room/Waiting_room";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/waiting_room" element={<Waiting_room/>}/>
            </Routes>
        </Router>
    );
}

export default App;
