import React from 'react';

const Dashboard = () => {
  // Crea una matriz 6x6 para representar las celdas del tablero
  const rows = Array(6).fill(null);
  const cols = Array(6).fill(null);

  // Función para generar un color aleatorio
  const getRandomColor = () => {
    const colors = ['bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-blue-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-6 grid-rows-6 gap-1 border-8 border-black rounded-lg p-2 shadow-2xl bg-yellow-100">
        {rows.map((_, rowIndex) =>
          cols.map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-14 h-14 ${getRandomColor()}  border-4 border-black rounded-lg shadow-lg flex items-center justify-center`}
            >
              {/* Eliminamos el contenido de la celda */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;








