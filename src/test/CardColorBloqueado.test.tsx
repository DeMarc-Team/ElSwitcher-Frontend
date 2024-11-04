import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";

import "@testing-library/jest-dom";
import { ColorResponse } from "@/services/api/obtener_color_bloqueado";
import { PartidaProvider } from "@/context/PartidaContext";
import { MovimientoContextProvider } from "@/context/UsarCartaMovimientoContext";
import { PartidaWebsocketProvider } from "@/context/PartidaWebsocket";
import { FiguraContextProvider } from "@/context/UsarCartaFiguraContext";
import CardColorBloqueado from "@/containers/partida/components/CardColorBloqueado";

vi.mock("@/services/api/obtener_color_bloqueado", () => ({
    ObtenerColorBloqueado: vi.fn(
        (partida: number): Promise<ColorResponse> =>
            Promise.resolve({ color: 3 }) 
    ),
}));



describe("Card de color bloqueado", () => {

    test("Se renderiza el componente", async () => {
        await act(async () => {
            render(
                <PartidaWebsocketProvider>
                    <PartidaProvider>
                        <MovimientoContextProvider>
                            <FiguraContextProvider>
                                <CardColorBloqueado
                                    id_partida={1}
                                />
                            </FiguraContextProvider>
                        </MovimientoContextProvider>
                    </PartidaProvider>
                </PartidaWebsocketProvider>
            );
        });

        
        expect(await screen.queryByLabelText("COLOR BLOQUEADO"))
    });

    test("El color bloqueado es el esperado", async () => {
        await act(async () => {
            render(
                <PartidaWebsocketProvider>
                    <PartidaProvider>
                        <MovimientoContextProvider>
                            <FiguraContextProvider>
                                <CardColorBloqueado
                                    id_partida={1}
                                />
                            </FiguraContextProvider>
                        </MovimientoContextProvider>
                    </PartidaProvider>
                </PartidaWebsocketProvider>
            );
        });

        await waitFor(() => {
            const colorBloqueadoElement = screen.getByText("COLOR BLOQUEADO").nextElementSibling;
            expect(colorBloqueadoElement).not.toHaveClass("bg-yellow-100");
            expect(colorBloqueadoElement).toHaveClass("bg-yellow-400");
        });
    });

});