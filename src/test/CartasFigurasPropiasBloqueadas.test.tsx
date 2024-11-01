import { act, render, screen } from "@testing-library/react";
import { expect, test, vi, beforeEach } from "vitest";
import CartasFigura from "../containers/partida/components/CartasFigura";
import { describe } from "node:test";
import Figura1 from "@/components/assets/cartas/CartasFiguras/Figura1.png";
import DorsoCarta from "@/components/assets/cartas/DorsoCarta.png";
import { FiguraContextProvider } from "@/context/UsarCartaFiguraContext";
import { PartidaProvider } from "@/context/PartidaContext";
import { MovimientoContextProvider } from "@/context/UsarCartaMovimientoContext";
import { PartidaWebsocketProvider } from "@/context/PartidaWebsocket";
import { useNotification } from "@/hooks/useNotification";

vi.mock("@/services/api/obtener_carta_figura", () => ({
    ObtenerCartasFiguras: vi.fn((id_partida: number, id_jugador: number) =>
        Promise.resolve([
            { figura: "f1", revelada: true, bloqueada: false },
            { figura: "f2", revelada: true, bloqueada: true },
            { figura: "f3", revelada: true, bloqueada: true },
        ])
    ),
}));

vi.mock("@/hooks/useNotification", () => ({
    useNotification: vi.fn(),
}));

describe("Cartas de figuras propias bloqueadas", () => {
    const mockShowToast = vi.fn((message: string, persist?: boolean) => {
        return;
    });

    // Ejecutar antes de cada test:
    beforeEach(() => {
        // Configurar el mock de useNotification
        vi.mocked(useNotification).mockReturnValue({
            showToastAlert: vi.fn(),
            closeToast: vi.fn(),
            showToastError: vi.fn(),
            showToastSuccess: vi.fn(),
            showToastInfo: mockShowToast,
            showToastWarning: vi.fn(),
        });
    });

    test("Se renderizan las 3 cartas", async () => {
        await act(async () => {
            render(
                <PartidaWebsocketProvider>
                    <PartidaProvider>
                        <MovimientoContextProvider>
                            <FiguraContextProvider>
                                <CartasFigura id_partida={1} id_jugador={1} />
                            </FiguraContextProvider>
                        </MovimientoContextProvider>
                    </PartidaProvider>
                </PartidaWebsocketProvider>
            );
        });

        const cartasImg = await screen.findAllByRole("img");
        expect(cartasImg.length).toBe(3);
    });

    test("Se muestra la imagen correcta del dorso de la carta en las bloqueadas", async () => {
        await act(async () => {
            render(
                <PartidaWebsocketProvider>
                    <PartidaProvider>
                        <MovimientoContextProvider>
                            <FiguraContextProvider>
                                <CartasFigura id_partida={1} id_jugador={1} />
                            </FiguraContextProvider>
                        </MovimientoContextProvider>
                    </PartidaProvider>
                </PartidaWebsocketProvider>
            );
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
                        <MovimientoContextProvider>
                            <FiguraContextProvider>
                                <CartasFigura id_partida={1} id_jugador={1} />
                            </FiguraContextProvider>
                        </MovimientoContextProvider>
                    </PartidaProvider>
                </PartidaWebsocketProvider>
            );
        });

        const cartasImg = await screen.findAllByRole("img");
        act(() => {
            cartasImg[1].click();
        });

        expect(mockShowToast).toHaveBeenCalledWith(
            "La carta está bloqueada.",
            true
        );
    });
});
