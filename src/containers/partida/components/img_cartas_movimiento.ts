import Movimiento1 from "@/components/assets/cartas/CartaMovimiento/Movimiento1.png";
import Movimiento2 from "@/components/assets/cartas/CartaMovimiento/Movimiento2.png";
import Movimiento3 from "@/components/assets/cartas/CartaMovimiento/Movimiento3.png";
import Movimiento4 from "@/components/assets/cartas/CartaMovimiento/Movimiento4.png";
import Movimiento5 from "@/components/assets/cartas/CartaMovimiento/Movimiento5.png";
import Movimiento6 from "@/components/assets/cartas/CartaMovimiento/Movimiento6.png";
import Movimiento7 from "@/components/assets/cartas/CartaMovimiento/Movimiento7.png";
import DorsoCarta from "@/components/assets/cartas/DorsoCarta.png";

interface CartaMovimiento {
    code: string;
    img: string;
    parcialmente_usada: boolean;
    rot_vec: { x: number; y: number };
}
const CARTAS_MOVIMIENTO: CartaMovimiento[] = [
    {
        code: "m1",
        img: Movimiento1,
        parcialmente_usada: false,
        rot_vec: { x: 2, y: 2 },
    },
    {
        code: "m2",
        img: Movimiento2,
        parcialmente_usada: false,
        rot_vec: { x: 2, y: 0 },
    },
    {
        code: "m3",
        img: Movimiento3,
        parcialmente_usada: false,
        rot_vec: { x: 1, y: 0 },
    },
    {
        code: "m4",
        img: Movimiento4,
        parcialmente_usada: false,
        rot_vec: { x: 1, y: 1 },
    },
    {
        code: "m5",
        img: Movimiento5,
        parcialmente_usada: false,
        rot_vec: { x: 2, y: 1 },
    },
    {
        code: "m6",
        img: Movimiento6,
        parcialmente_usada: false,
        rot_vec: { x: 1, y: 2 },
    },
    {
        code: "m7",
        img: Movimiento7,
        parcialmente_usada: false,
        rot_vec: { x: 4, y: 0 },
    },
    {
        code: "dorso",
        img: DorsoCarta,
        parcialmente_usada: false,
        rot_vec: { x: 0, y: 0 },
    },
];

const imageCartaMovimiento = (code: string): CartaMovimiento => {
    const carta = CARTAS_MOVIMIENTO.find(
        (carta) => carta.code === code
    ) as CartaMovimiento;
    if (carta) {
        return carta;
    }
    return CARTAS_MOVIMIENTO.find(
        (carta) => carta.code === "dorso"
    ) as CartaMovimiento;
};
export { imageCartaMovimiento, CARTAS_MOVIMIENTO, type CartaMovimiento };
