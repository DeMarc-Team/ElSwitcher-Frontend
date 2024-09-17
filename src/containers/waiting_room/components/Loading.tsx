import React, { useState, useEffect } from 'react';

const Loading = () => {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
        // Alterna entre 1, 2 y 3 puntos
        if (prevDots === '...') return '.';
        return prevDots + '.';
      });
    }, 500); // Actualiza cada 500 ms

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  return <div className=' font-extrabold text-4xl '>{dots}</div>;
};

export default Loading;
