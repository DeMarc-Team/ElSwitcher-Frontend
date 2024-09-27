import React, { useEffect, useState } from 'react';
import { ObtenerTablero } from '../../../services/api/ver_tablero'

const COLORES: string[] = [
  'red',    // 0
  'green',  // 1
  'blue',   // 2
  'yellow'  // 3
];

interface DashboardProps {
  id_partida: number; // Cambia el tipo según lo que necesites (puede ser string o number)
}

const Board: React.FC<DashboardProps> = ({ id_partida }) => {
  const [tablero, setTablero] = useState<number[][]>([]); // Asegúrate de que el tipo coincida con lo que esperas

  const fetchTablero = async () => {
    try {
      const data = await ObtenerTablero(id_partida);
      setTablero(data.tablero6x6);
    } catch (error) {
      console.error('Error al obtener el tablero:', error);
    }
  };

  useEffect(() => {
    fetchTablero();
  }, [id_partida]);
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-6 grid-rows-6 gap-1 border-8 border-black rounded-lg p-2 shadow-2xl bg-yellow-100">
        {tablero.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="w-14 h-14 border-4 border-black rounded-lg shadow-lg flex items-center justify-center"
              style={{ backgroundColor: COLORES[cell] || 'white' }} // Convertir a string
              >
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Board;








