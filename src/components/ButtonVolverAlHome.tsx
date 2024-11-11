import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ButtonVolverAlHome() {
    const navigate = useNavigate();
    return (
        <Button
            variant="secondary"
            className="w-full border-2 border-black"
            onClick={() => navigate("/#listapartidas")}
        >
            Volver al Inicio
        </Button>
    );
}
