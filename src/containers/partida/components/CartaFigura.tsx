import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import figuraLDerecha from "../../../figuras/figura-L-derecha.png";
import figuraLIzquierda from "../../../figuras/figura-L-izquierda.png";
import figuraCruz from "../../../figuras/figura-cruz.png";
import figuraLineaCuatro from "../../../figuras/figura-linea-de-cuatro-casillas.png";
import figuraT from "../../../figuras/figura-t.png";

const CartaFigura = () => {
    const imagenes = [
        figuraLDerecha,
        figuraLIzquierda,
        figuraCruz,
        figuraLineaCuatro,
        figuraT,
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

export default CartaFigura;
