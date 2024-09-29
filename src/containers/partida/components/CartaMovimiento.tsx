import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import cruceDiagonalConUnEspacio from "../../../movimientos/cruce-diagonal-con-un-espacio.png";
import cruceDiagonalContiguo from "../../../movimientos/cruce-diagonal-contiguo.png";
import cruce_L_a_la_derecha from "../../../movimientos/cruce-en-L-a-la-derecha.png";
import cruce_L_a_la_izquierda from "../../../movimientos/cruce-en-L-a-la-izquierda.png";
import cruceEnLineaConUnEspacio from "../../../movimientos/cruce-en-linea-con-un-espacio.png";
import cruceEnLineaContiguo from "../../../movimientos/cruce-en-linea-contiguo.png";
import cruceEnLineaLateral from "../../../movimientos/cruce-en-linea-lateral.png";

const CartaMovimiento = () => {
    const imagenes = [
        cruceDiagonalConUnEspacio,
        cruceDiagonalContiguo,
        cruce_L_a_la_derecha,
        cruce_L_a_la_izquierda,
        cruceEnLineaConUnEspacio,
        cruceEnLineaContiguo,
        cruceEnLineaLateral,
    ];

    const [mostrarCartas, setMostrarCartas] = useState(false);

    const handleClick = () => {
        setMostrarCartas(true); // Muestra las cartas al hacer clic
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                flexDirection: "column",
            }}
        >
            <div style={{ display: "flex", justifyContent: "center" }}>
                {imagenes.slice(0, 3).map((imagen, index) => (
                    <img
                        key={index}
                        src={imagen}
                        style={{
                            width: "50px",
                            height: "auto",
                            border: "2px solid black",
                            borderRadius: "5px",
                            margin: "5px",
                        }}
                        alt={`Carta ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CartaMovimiento;
