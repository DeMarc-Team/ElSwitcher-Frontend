import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import {
    CrearPartidaForm,
    CrearPartidaResponse,
} from "@/services/api/crear_partida";
import { UnirsePartidaResponse } from "@/services/api/unirse_partida";
import Room from "@/containers/partida_sala_espera/components/Room";
import { SaveNewSession } from "@/services/session_browser";
import { Partida, Jugador } from "@/models/types";
import { ObtenerInfoPartida } from "@/services/api/obtener_info_partida";

vi.mock("@/services/api/crearPartida", () => ({
    crearPartida: vi.fn(
        (form: CrearPartidaForm): Promise<CrearPartidaResponse> =>
            Promise.resolve({
                id: 1,
                nombre_partida: "Partida 1",
                nombre_creador: "Jugador 1",
                id_creador: 123,
            })
    ),
}));

vi.mock("@/services/api/unirsePartida", () => ({
    UnirsePartida: vi.fn(
        (
            partidaId: number = 1,
            username: string
        ): Promise<UnirsePartidaResponse> =>
            Promise.resolve({
                nombre: username,
                id_jugador: 125,
            })
    ),
}));

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

vi.mock("@/services/api/obtener_jugadores", () => ({
    ObtenerJugadores: vi.fn(() =>
        Promise.resolve([
            { id_jugador: 123, nombre: "Jugador 1" },
            { id_jugador: 125, nombre: "Jugador 2" },
        ])
    ),
}));

vi.mock("@/context/PartidaWebsocket", () => ({
    useInsidePartidaWebSocket: vi.fn(() => {
        let triggerActualizarSalaEspera = true;
        let openConnectionToPartida = () => {};
        return {
            triggerActualizarSalaEspera,
            openConnectionToPartida,
        };
    }),
}));

const mockCreador: Jugador = {
    id: 123,
    nombre: "Jugador 1",
};

const mockJugador: Jugador = {
    id: 1,
    nombre: "Jugador 2",
};

const mockPartida: Partida = {
    id: 1,
    nombre: "Partida 1",
};

describe("Sala de espera", () => {
    SaveNewSession(mockCreador, mockPartida);

    test("Se renderiza y funciona la lista de jugadores del room", async () => {
        render(
            <BrowserRouter>
                <Room
                    title="Sala de Espera"
                    description="Esperando a que se unan los jugadores, se paciente."
                    id_partida={1}
                />
            </BrowserRouter>
        );

        expect(
            screen.findByText(
                "Esperando a que se unan los jugadores, se paciente."
            )
        ).toBeDefined();

        expect(await screen.findByText("Jugador 1")).toBeDefined();
        expect(await screen.findByText("Jugador 2")).toBeDefined();

        const respuesta = await ObtenerInfoPartida(1);
        expect(respuesta.iniciada == false);
    });

    test("Se renderiza y funciona el botón de inicio del room", async () => {
        render(
            <BrowserRouter>
                <Room
                    title="Sala de Espera"
                    description="Esperando a que se unan los jugadores, se paciente."
                    id_partida={1}
                />
            </BrowserRouter>
        );

        const respuesta = await ObtenerInfoPartida(1);
        expect(respuesta.iniciada).toBe(false);

        //El botón se renderiza solo para el creador
        if (mockCreador.id === 123) {
            const iniciarButton = screen.findByText("Iniciar partida");
            expect(iniciarButton).toBeDefined();
        } else {
            expect(screen.findByText("Iniciar partida")).not.toBeDefined();
        }
    });

    test("Revisamos que se este renderizando el boton de Volver al inicio", async () => {
        render(
            <BrowserRouter>
                <Room
                    title="Sala de Espera"
                    description="Esperando a que se unan los jugadores, se paciente."
                    id_partida={1}
                />
            </BrowserRouter>
        );

        expect(screen.findByText("Volver al inicio")).toBeDefined();
    });
});
