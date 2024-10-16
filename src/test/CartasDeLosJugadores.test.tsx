import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { CartasDeLosJugadores } from "@/containers/partida/components/CartasDeLosJugadores";
import { ObtenerInfoPartida } from "@/services/api/obtener_info_partida";
import Figura1 from "@/components/assets/cartas/CartasFiguras/Figura1.png";
import Figura2 from "@/components/assets/cartas/CartasFiguras/Figura2.png";
import Figura3 from "@/components/assets/cartas/CartasFiguras/Figura3.png";

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
        render(<CartasDeLosJugadores id_partida={1} id_jugador={123} />);
        await waitFor(() => {
            // Verificar que el título se renderiza
            expect(screen.getByText("Cartas de otros jugadores")).toBeDefined();

            // Verificar que el nombre del segundo jugador se renderiza
            expect(screen.getByText("Cartas de Jugador 2")).toBeDefined();
        });
    });

    test("Se muestran las cartas del jugador", async () => {
        await act(async () => {
            render(<CartasDeLosJugadores id_partida={1} id_jugador={123} />);
        });
        await waitFor(() => {
            //Está ese jugador
            expect(screen.getByText("Cartas de Jugador 2")).toBeDefined();

            //Clickeo sobre su nombre
            const nombreJugador = screen.getByText("Cartas de Jugador 2");
            fireEvent.click(nombreJugador);

            //Veo sus cartas
            expect(screen.findAllByRole("img"));
        });
        const cartasImg = await screen.findAllByRole("img");
        expect(cartasImg[0]).toHaveAttribute("src", Figura1);
        expect(cartasImg[1]).toHaveAttribute("src", Figura2);
        expect(cartasImg[2]).toHaveAttribute("src", Figura3);
    });
});
