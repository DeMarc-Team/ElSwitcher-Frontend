import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Board from "../containers/partida/components/Board"; // Ajusta la ruta según tu proyecto

// Mockear el servicio ObtenerTablero
vi.mock("@/services/api/ver_tablero", () => ({
    ObtenerTablero: vi.fn(
        (id_partida: number): Promise<{ tablero6x6: number[][] }> =>
            Promise.resolve({
                tablero6x6: [
                    [1, 2, 3, 4, 1, 2],
                    [3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2],
                    [3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2],
                    [3, 4, 1, 2, 3, 4],
                ],
            })
    ),
}));

describe("Componente Board", () => {
    test("Se renderiza todo el tablero", async () => {
        render(<Board id_partida={1} />);

        const buttons = await screen.findAllByRole("button");

        // Verificar que se rendericen 36 botones (6x6)
        expect(buttons).toHaveLength(36);
    });

    test("Se renderizan los colores correctos", async () => {
        render(<Board id_partida={1} />);

        const buttons = await screen.findAllByRole("button");

        // Verificar que algunos botones tengan los colores correctos
        expect(buttons[0]).toHaveClass("bg-red-400");
        expect(buttons[1]).toHaveClass("bg-green-400");
        expect(buttons[2]).toHaveClass("bg-blue-400");
        expect(buttons[3]).toHaveClass("bg-yellow-400");
        expect(buttons[4]).toHaveClass("bg-red-400");
    });

    test("Todos los botones tienen color", async () => {
        render(<Board id_partida={1} />);

        const buttons = await screen.findAllByRole("button");

        // Verificar que todos los colores tengan un color valido
        for (let index = 0; index < 36; index++) {
            expect(buttons[index]).toHaveClass(
                /bg-(red|green|blue|yellow)-400/
            );
        }
    });
});
