import { act, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { describe } from "node:test";
import CartasMovimiento from "@/containers/partida/components/CartasMovimiento";
import Movimiento1 from "@/components/assets/cartas/CartaMovimiento/Movimiento1.png";
import Movimiento2 from "@/components/assets/cartas/CartaMovimiento/Movimiento2.png";
import Movimiento3 from "@/components/assets/cartas/CartaMovimiento/Movimiento3.png";
import { MovimientoContextProvider } from "@/context/UsarCartaMovimientoContext";
import { PartidaProvider } from "@/context/PartidaContext";
import { PartidaWebsocketProvider } from "@/context/PartidaWebsocket";
import { FiguraContextProvider } from "@/context/UsarCartaFiguraContext";

vi.mock("@/services/api/obtener_carta_movimiento", () => ({
    ObtenerCartasMovimientos: vi.fn((id_partida: number, id_jugador: number) =>
        Promise.resolve([
            { movimiento: "m1" },
            { movimiento: "m2" },
            { movimiento: "m3" },
        ])
    ),
}));

describe("Cartas de movimietntos", () => {
    test("Se renderizan las 3 cartas", async () => {
        await act(async () => {
            render(
                <PartidaWebsocketProvider>
                    <PartidaProvider>
                        <MovimientoContextProvider>
                            <FiguraContextProvider>
                                <CartasMovimiento
                                    id_partida={1}
                                    id_jugador={1}
                                />
                            </FiguraContextProvider>
                        </MovimientoContextProvider>
                    </PartidaProvider>
                </PartidaWebsocketProvider>
            );
        });

        //Se renderizaron las 3 imagenes
        const cartasImg = await screen.findAllByRole("img");
        expect(cartasImg.length).toBe(3);
    });

    test("Tienen bien su texto alternativo", async () => {
        await act(async () => {
            render(
                <PartidaWebsocketProvider>
                    <PartidaProvider>
                        <MovimientoContextProvider>
                            <FiguraContextProvider>
                                <CartasMovimiento
                                    id_partida={1}
                                    id_jugador={1}
                                />
                            </FiguraContextProvider>
                        </MovimientoContextProvider>
                    </PartidaProvider>
                </PartidaWebsocketProvider>
            );
        });

        const cartasImg = await screen.findAllByRole("img");

        expect(cartasImg[0]).toHaveAttribute("alt", "Carta 1");
        expect(cartasImg[1]).toHaveAttribute("alt", "Carta 2");
        expect(cartasImg[2]).toHaveAttribute("alt", "Carta 3");
    });

    test("Se muestra la imagen que se debe mostrar", async () => {
        await act(async () => {
            render(
                <PartidaWebsocketProvider>
                    <PartidaProvider>
                        <MovimientoContextProvider>
                            <FiguraContextProvider>
                                <CartasMovimiento
                                    id_partida={1}
                                    id_jugador={1}
                                />
                            </FiguraContextProvider>
                        </MovimientoContextProvider>
                    </PartidaProvider>
                </PartidaWebsocketProvider>
            );
        });
        const cartasImg = await screen.findAllByRole("img");
        expect(cartasImg[0]).toHaveAttribute("src", Movimiento1);
        expect(cartasImg[1]).toHaveAttribute("src", Movimiento2);
        expect(cartasImg[2]).toHaveAttribute("src", Movimiento3);
    });
});
