import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach } from "vitest";
import Figura1 from "@/components/assets/cartas/CartasFiguras/Figura1.png";
import DorsoCarta from "@/components/assets/cartas/DorsoCarta.png";
import { PartidaProvider } from "@/context/PartidaContext";
import { PartidaWebsocketProvider } from "@/context/PartidaWebsocket";
import { FiguraContextProvider } from "@/context/UsarCartaFiguraContext";
import { MovimientoContextProvider } from "@/context/UsarCartaMovimientoContext";
import CartasDeJugador from "@/containers/partida/components/CartasDeJugador";
import { useNotification } from "@/hooks/useNotification";

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
    ObtenerCartasFiguras: vi.fn((_: number, __: number) =>
        Promise.resolve([
            { figura: "f1", bloqueada: false },
            { figura: "f2", bloqueada: true },
            { figura: "f3", bloqueada: true },
        ])
    ),
}));

vi.mock("@/hooks/useNotification", () => ({
    useNotification: vi.fn(),
}));

describe("Componente CartasDeLosJugadores verificando las cartas bloqueadas", () => {
    const mockShowToast = vi.fn((_: string, __?: boolean) => {
        return;
    });

    // Ejecutar antes de cada test:
    beforeEach(() => {
        // Configurar el mock de useNotification
        vi.mocked(useNotification).mockReturnValue({
            showToastAlert: mockShowToast,
            closeToast: vi.fn(),
            showToastError: vi.fn(),
            showToastSuccess: vi.fn(),
            showToastInfo: vi.fn(),
            showToastWarning: vi.fn(),
        });
    });

    test("Se muestran las cartas del jugador y las bloqueadas", async () => {
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
        expect(cartasImg[1]).toHaveAttribute("src", DorsoCarta);
        expect(cartasImg[2]).toHaveAttribute("src", DorsoCarta);
    });

    test("Al hacerles click notifican que están bloqueadas", async () => {
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

        const cartasImg = await screen.findAllByRole("img");
        act(() => {
            cartasImg[1].click();
        });

        expect(mockShowToast).toHaveBeenCalledWith(
            "Cada jugador solo puede tener una carta bloqueada."
        );

        act(() => {
            cartasImg[2].click();
        });

        expect(mockShowToast).toHaveBeenCalledWith(
            "Cada jugador solo puede tener una carta bloqueada."
        );
    });

    test("Al hacerles click en cartas no bloqueadas se notifica que puede usarla", async () => {
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

        const cartasImg = await screen.findAllByRole("img");
        act(() => {
            cartasImg[0].click();
        });

        expect(mockShowToast).toHaveBeenCalledWith(
            "Cada jugador solo puede tener una carta bloqueada."
        );
    });
});
