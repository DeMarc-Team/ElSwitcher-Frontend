import { describe,expect, test, vi} from 'vitest'
import { fireEvent, render, screen} from '@testing-library/react';
import Partidas from './Partidas';
import { MemoryRouter } from 'react-router-dom';

describe('Form Unirse', () => {

    //Necesito una partida para probar el form
  vi.mock('@/services/api/obtener_partidas', () => ({
    ObtenerPartidas: vi.fn(() => Promise.resolve([
      { id: 1, nombre_partida: 'Partida 1' }]))
  }));

    test('Mocker las partidas y ver el form', async () => {
      render(
        <MemoryRouter>
          <Partidas />
        </MemoryRouter>
      );
    expect(await screen.findByText('Partida 1')).toBeDefined();
    
    //No se tiene que renderizar antes de ser llamado
    expect(screen.queryByLabelText("Nombre de Usuario")).toBeNull();

    //Simular el evento de clickear una partida
    const botonUnirsePartida = screen.getByText("Partida 1");
    fireEvent.click(botonUnirsePartida);

    //Corroborar que el formulario se abrió
    expect(screen.queryByLabelText("Unirse a la partida Partida 1")).not.toBeNull();
    
    //Obtener el campo de nombre y darle un valor
    const inputNombre = screen.getByLabelText("Nombre de Usuario");
    // Simular la interacción del usuario llenando el formulario
    fireEvent.change(inputNombre, { target: { value: "Usuario Test" } });
    expect(inputNombre).not.toHaveValue("");

    // Simular el envío del formulario y click en "Unirse a Partida"
    const botonUnirse = screen.getByText("Unirse");
    fireEvent.click(botonUnirse);

  })
     
});