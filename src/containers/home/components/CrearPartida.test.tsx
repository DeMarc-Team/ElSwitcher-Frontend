import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe,test,expect } from 'vitest';
import CrearPartida from './CrearPartida';

describe('Crear Partida', () => {
  test('Se renderiza el botón de crear partida', async () => {
    render(
      <BrowserRouter>
        <CrearPartida />
      </BrowserRouter>
    );
    expect(screen.getByText('Crear Partida')).toBeDefined();
  });

});
