import Figura1 from "@/components/assets/cartas/CartasFiguras/Figura1.png";
import Figura2 from "@/components/assets/cartas/CartasFiguras/Figura2.png";
import Figura3 from "@/components/assets/cartas/CartasFiguras/Figura3.png";
import Figura4 from "@/components/assets/cartas/CartasFiguras/Figura4.png";
import Figura5 from "@/components/assets/cartas/CartasFiguras/Figura5.png";
import Figura6 from "@/components/assets/cartas/CartasFiguras/Figura6.png";
import Figura7 from "@/components/assets/cartas/CartasFiguras/Figura7.png";
import Figura8 from "@/components/assets/cartas/CartasFiguras/Figura8.png";
import Figura9 from "@/components/assets/cartas/CartasFiguras/Figura9.png";
import Figura10 from "@/components/assets/cartas/CartasFiguras/Figura10.png";
import Figura11 from "@/components/assets/cartas/CartasFiguras/Figura11.png";
import Figura12 from "@/components/assets/cartas/CartasFiguras/Figura12.png";
import Figura13 from "@/components/assets/cartas/CartasFiguras/Figura13.png";
import Figura14 from "@/components/assets/cartas/CartasFiguras/Figura14.png";
import Figura15 from "@/components/assets/cartas/CartasFiguras/Figura15.png";
import Figura16 from "@/components/assets/cartas/CartasFiguras/Figura16.png";
import Figura17 from "@/components/assets/cartas/CartasFiguras/Figura17.png";
import Figura18 from "@/components/assets/cartas/CartasFiguras/Figura18.png";
import Figura19 from "@/components/assets/cartas/CartasFiguras/Figura19.png";
import Figura20 from "@/components/assets/cartas/CartasFiguras/Figura20.png";
import Figura21 from "@/components/assets/cartas/CartasFiguras/Figura21.png";
import Figura22 from "@/components/assets/cartas/CartasFiguras/Figura22.png";
import Figura23 from "@/components/assets/cartas/CartasFiguras/Figura23.png";
import Figura24 from "@/components/assets/cartas/CartasFiguras/Figura24.png";
import Figura25 from "@/components/assets/cartas/CartasFiguras/Figura25.png";
import DorsoCarta from "@/components/assets/cartas/DorsoCarta.png";

interface CartaFigura {
    code: string;
    img: string;
}

const CARTAS_FIGURA: CartaFigura[] = [
    { code: "f1", img: Figura1 },
    { code: "f2", img: Figura2 },
    { code: "f3", img: Figura3 },
    { code: "f4", img: Figura4 },
    { code: "f5", img: Figura5 },
    { code: "f6", img: Figura6 },
    { code: "f7", img: Figura7 },
    { code: "f8", img: Figura8 },
    { code: "f9", img: Figura9 },
    { code: "f10", img: Figura10 },
    { code: "f11", img: Figura11 },
    { code: "f12", img: Figura12 },
    { code: "f13", img: Figura13 },
    { code: "f14", img: Figura14 },
    { code: "f15", img: Figura15 },
    { code: "f16", img: Figura16 },
    { code: "f17", img: Figura17 },
    { code: "f18", img: Figura18 },
    { code: "f19", img: Figura19 },
    { code: "f20", img: Figura20 },
    { code: "f21", img: Figura21 },
    { code: "f22", img: Figura22 },
    { code: "f23", img: Figura23 },
    { code: "f24", img: Figura24 },
    { code: "f25", img: Figura25 },
    { code: "dorso", img: DorsoCarta },
];

const imageCartaFigura = (code: string): CartaFigura => {
    const carta = CARTAS_FIGURA.find(
        (carta) => carta.code === code
    ) as CartaFigura;
    if (carta) {
        return carta;
    } else {
        return CARTAS_FIGURA.find(
            (carta) => carta.code === "dorso"
        ) as CartaFigura;
    }
};

export { CARTAS_FIGURA, imageCartaFigura, type CartaFigura };
