import Figura1 from "@/components/assets/cartas/CartasFiguras/Figura1.png";
import Figura2 from "@/components/assets/cartas/CartasFiguras/Figura2.png";
import Figura3 from "@/components/assets/cartas/CartasFiguras/Figura3.png";
import Figura4 from "@/components/assets/cartas/CartasFiguras/Figura4.png";
import Figura5 from "@/components/assets/cartas/CartasFiguras/Figura5.png";
import Figura6 from "@/components/assets/cartas/CartasFiguras/Figura6.png";
import DorsoCarta from "@/components/assets/cartas/DorsoCarta.png";

interface CartaFigura {
    code: string;
    img: string;
    revelada?: boolean;
}

const CARTAS_FIGURA: CartaFigura[] = [
    { code: "f1", img: Figura1 },
    { code: "f2", img: Figura2 },
    { code: "f3", img: Figura3 },
    { code: "f4", img: Figura4 },
    { code: "f5", img: Figura5 },
    { code: "f6", img: Figura6 },
    { code: "dorso", img: DorsoCarta },
];

const imageCartaFigura = (code: string, revelada: boolean): CartaFigura => {
    const carta = CARTAS_FIGURA.find(
        (carta) => carta.code === code
    ) as CartaFigura;
    if (revelada && carta) {
        return carta;
    } else {
        return CARTAS_FIGURA.find(
            (carta) => carta.code === "dorso"
        ) as CartaFigura;
    }
};

export { CARTAS_FIGURA, imageCartaFigura, type CartaFigura };
