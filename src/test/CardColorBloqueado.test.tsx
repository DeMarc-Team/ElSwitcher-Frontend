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
    ObtenerColorBloqueado: vi.fn((partida: number): Promise<ColorResponse> => {
        let color;
        if (partida === 1) {
            color = 0;
        } else if (partida === 2) {
            color = 1;
        } else if (partida === 3) {
            color = 2;
        } else if (partida === 4) {
            color = 3;
        } else {
            color = -1; // valor por defecto si no es 1, 2 o 3
        }

        return Promise.resolve({ color });
    }),
}));

describe("Card de color bloqueado", () => {
    test("Se renderiza el componente", async () => {
        await act(async () => {
            render(
                <PartidaWebsocketProvider>
                    <PartidaProvider>
                        <MovimientoContextProvider>
                            <FiguraContextProvider>
                                <CardColorBloqueado id_partida={1} />
                            </FiguraContextProvider>
                        </MovimientoContextProvider>
                    </PartidaProvider>
                </PartidaWebsocketProvider>
            );
        });

        expect(await screen.queryByLabelText("COLOR BLOQUEADO"));
    });

    test("El color bloqueado es el rojo", async () => {
        await act(async () => {
            render(
                <PartidaWebsocketProvider>
                    <PartidaProvider>
                        <MovimientoContextProvider>
                            <FiguraContextProvider>
                                <CardColorBloqueado id_partida={1} />
                            </FiguraContextProvider>
                        </MovimientoContextProvider>
                    </PartidaProvider>
                </PartidaWebsocketProvider>
            );
        });

        await waitFor(() => {
            const colorBloqueadoElement =
                screen.getByText("COLOR BLOQUEADO").nextElementSibling;
            expect(colorBloqueadoElement).not.toHaveClass("bg-yellow-100");
            expect(colorBloqueadoElement).toHaveClass("bg-red-400");
        });
    });

    test("El color bloqueado es el verde", async () => {
        await act(async () => {
            render(
                <PartidaWebsocketProvider>
                    <PartidaProvider>
                        <MovimientoContextProvider>
                            <FiguraContextProvider>
                                <CardColorBloqueado id_partida={2} />
                            </FiguraContextProvider>
                        </MovimientoContextProvider>
                    </PartidaProvider>
                </PartidaWebsocketProvider>
            );
        });

        await waitFor(() => {
            const colorBloqueadoElement =
                screen.getByText("COLOR BLOQUEADO").nextElementSibling;
            expect(colorBloqueadoElement).not.toHaveClass("bg-yellow-100");
            expect(colorBloqueadoElement).toHaveClass("bg-green-400");
        });
    });

    test("El color bloqueado es el azul", async () => {
        await act(async () => {
            render(
                <PartidaWebsocketProvider>
                    <PartidaProvider>
                        <MovimientoContextProvider>
                            <FiguraContextProvider>
                                <CardColorBloqueado id_partida={3} />
                            </FiguraContextProvider>
                        </MovimientoContextProvider>
                    </PartidaProvider>
                </PartidaWebsocketProvider>
            );
        });

        await waitFor(() => {
            const colorBloqueadoElement =
                screen.getByText("COLOR BLOQUEADO").nextElementSibling;
            expect(colorBloqueadoElement).not.toHaveClass("bg-yellow-100");
            expect(colorBloqueadoElement).toHaveClass("bg-blue-400");
        });
    });

    test("El color bloqueado es el amarillo", async () => {
        await act(async () => {
            render(
                <PartidaWebsocketProvider>
                    <PartidaProvider>
                        <MovimientoContextProvider>
                            <FiguraContextProvider>
                                <CardColorBloqueado id_partida={4} />
                            </FiguraContextProvider>
                        </MovimientoContextProvider>
                    </PartidaProvider>
                </PartidaWebsocketProvider>
            );
        });

        await waitFor(() => {
            const colorBloqueadoElement =
                screen.getByText("COLOR BLOQUEADO").nextElementSibling;
            expect(colorBloqueadoElement).not.toHaveClass("bg-yellow-100");
            expect(colorBloqueadoElement).toHaveClass("bg-yellow-400");
        });
    });

    test("No hay color bloqueado", async () => {
        await act(async () => {
            render(
                <PartidaWebsocketProvider>
                    <PartidaProvider>
                        <MovimientoContextProvider>
                            <FiguraContextProvider>
                                <CardColorBloqueado id_partida={5} />
                            </FiguraContextProvider>
                        </MovimientoContextProvider>
                    </PartidaProvider>
                </PartidaWebsocketProvider>
            );
        });

        await waitFor(() => {
            const colorBloqueadoElement =
                screen.getByText("COLOR BLOQUEADO").nextElementSibling;
            expect(colorBloqueadoElement).toHaveClass("bg-yellow-100");
            expect(colorBloqueadoElement).not.toHaveClass("bg-red-400");
            expect(colorBloqueadoElement).not.toHaveClass("bg-blue-400");
            expect(colorBloqueadoElement).not.toHaveClass("bg-green-400");
            expect(colorBloqueadoElement).not.toHaveClass("bg-yellow-400");
        });
    });
});
