import { describe, expect, test, vi } from "vitest";
import { findByText, fireEvent, render, screen } from "@testing-library/react";
import Partidas from "../containers/home/components/Partidas";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { CrearPartidaForm, CrearPartidaResponse } from "@/services/api/crear_partida";
import { UnirsePartidaResponse } from "@/services/api/unirse_partida";
import SalaEspera from "@/containers/partida_sala_espera/SalaEspera";
import Room from "@/containers/partida_sala_espera/components/Room";
import { LoadSessionJugador, SaveSessionJugador, SessionJugador } from "@/services/session_jugador";
import { IniciarPartida, IniciarPartidaResponse } from "@/services/api/iniciar_partida";
import { ObtenerInfoPartida } from "@/services/api/obtener_info_partida";
import { assert } from "console";

vi.mock("@/services/api/crearPartida", () => ({
    crearPartida: vi.fn((form: CrearPartidaForm): Promise<CrearPartidaResponse> => 
        Promise.resolve({
            id: 1,
            nombre_partida: "Partida 1",
            nombre_creador: "Jugador 1",
            id_creador: 123,
        })
    ),
}));

vi.mock("@/services/api/unirsePartida", () => ({
    UnirsePartida: vi.fn((partidaId: number = 1, username: string): Promise<UnirsePartidaResponse> => 
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

const mockSession1: SessionJugador = {
    id: 123,
    nombre: "Jugador 1",
    id_partida: 1
};

const mockSession2: SessionJugador = {
    id: 1,
    nombre: "Jugador 2",
    id_partida: 125
};

// vi.mock('@/services/api/iniciarPartida', () => ({
//     IniciarPartida: vi.fn((partidaId: number = 1): Promise<IniciarPartidaResponse> => 
//         Promise.resolve({
//             partidaIniciadaConExito: true,
//         })
//     ),
// }));

describe("Sala de espera", () => {
    SaveSessionJugador(mockSession1)
    SaveSessionJugador(mockSession2)

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

        expect(screen.findByText("Esperando a que se unan los jugadores, se paciente.")).toBeDefined();

        expect(await screen.findByText("Jugador 1")).toBeDefined();
        expect(await screen.findByText("Jugador 2")).toBeDefined();

        const respuesta = await ObtenerInfoPartida(1);
        expect(respuesta.iniciada==false)
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
        if (mockSession1.id === 123) {
            const iniciarButton = screen.findByText("Iniciar partida");
            expect(iniciarButton).toBeDefined();
        }
        else{
            expect(screen.findByText("Iniciar partida")).not.toBeDefined();
        }
    });

});

