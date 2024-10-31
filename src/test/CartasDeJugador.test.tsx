import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Figura1 from "@/components/assets/cartas/CartasFiguras/Figura1.png";
import Figura2 from "@/components/assets/cartas/CartasFiguras/Figura2.png";
import Figura3 from "@/components/assets/cartas/CartasFiguras/Figura3.png";
import { PartidaProvider } from "@/context/PartidaContext";
import { PartidaWebsocketProvider } from "@/context/PartidaWebsocket";
import { FiguraContextProvider } from "@/context/UsarCartaFiguraContext";
import { MovimientoContextProvider } from "@/context/UsarCartaMovimientoContext";
import CartasDeJugador from "@/containers/partida/components/CartasDeJugador";

vi.mock("@/services/api/obtener_info_partida", () => ({
    ObtenerInfoPartida: vi.fn(() =>
        Promise.resolve({
            nombre_partida: "Partida 1",
            nombre_creador: "Jugador 1",
            id_creador: 123,
            jugadores: [
                { id_jugador: 123, nombre: "Jugador 1" },
                { id_jugador: 125, nombre: "Jugador 2" },
            ],
            cantidad_jugadores: 2,
            iniciada: false,
        })
    ),
}));

vi.mock("@/services/api/obtener_carta_figura", () => ({
    ObtenerCartasFiguras: vi.fn((id_partida: number, id_jugador: number) =>
        Promise.resolve([
            { figura: "f1", revelada: true },
            { figura: "f2", revelada: true },
            { figura: "f3", revelada: true },
        ])
    ),
}));

describe("Componente CartasDeLosJugadores", () => {
    test("Renderiza el espacio de las cartas de los otros jugadores", async () => {
        render(
            <PartidaWebsocketProvider>
                <PartidaProvider>
                    <FiguraContextProvider>
                        <MovimientoContextProvider>
                            <CartasDeJugador
                                id_partida={1}
                                id_jugador={125}
                                nombre_jugador="Jugador 2"
                            />
                        </MovimientoContextProvider>
                    </FiguraContextProvider>
                </PartidaProvider>
            </PartidaWebsocketProvider>
        );
        await waitFor(() => {
            expect(screen.getByText("Jugador 2")).toBeInTheDocument();
        });
    });

    test("Se muestran las cartas del jugador", async () => {
        await act(async () => {
            render(
                <PartidaWebsocketProvider>
                    <PartidaProvider>
                        <FiguraContextProvider>
                            <MovimientoContextProvider>
                                <CartasDeJugador
                                    id_partida={1}
                                    id_jugador={125}
                                    nombre_jugador="Jugador 2"
                                />
                            </MovimientoContextProvider>
                        </FiguraContextProvider>
                    </PartidaProvider>
                </PartidaWebsocketProvider>
            );
        });
        await waitFor(() => {
            //Está ese jugador
            expect(screen.getByText("Jugador 2")).toBeDefined();

            //Veo sus cartas
            expect(screen.findAllByRole("img"));
        });
        const cartasImg = await screen.findAllByRole("img");
        expect(cartasImg[0]).toHaveAttribute("src", Figura1);
        expect(cartasImg[1]).toHaveAttribute("src", Figura2);
        expect(cartasImg[2]).toHaveAttribute("src", Figura3);
    });
});
