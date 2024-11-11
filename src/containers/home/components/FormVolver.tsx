import { CircleArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Session, SetCurrentSession } from "@/services/session_browser";
import { useNavigate } from "react-router-dom";

export default function FormVolver({
    session,
}: Readonly<{ session: Session }>) {
    const navigate = useNavigate();
    return (
        <Button
            variant="outline"
            className="my-2 w-full justify-between rounded-md border-2 border-black bg-transparent py-3 text-center"
            onClick={() => {
                SetCurrentSession(session.partida.id);
                navigate(`/partidas/${session.partida.id}/sala-espera`);
            }}
        >
            <span className="mr-5 text-wrap break-all text-left">
                <b>{session.partida.nombre}</b>
            </span>
            <div className="flex items-center justify-center gap-2">
                <span className="mr-5 flex h-[1.3rem] items-center justify-center gap-2 rounded-lg border-2 border-black bg-green-500 px-2">
                    <span className="font font-bold">ESTAS JUGANDO</span>
                </span>
                <span className="underline">Volver</span>
                <CircleArrowRight className="w-5" />
            </div>
        </Button>
    );
}
