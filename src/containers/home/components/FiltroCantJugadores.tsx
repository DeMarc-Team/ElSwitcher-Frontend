interface FiltroCantJugadoresProps {
    filtros: number[];
    manejarFiltro: (cantidad: number) => void;
}

const FiltroCantJugadores: React.FC<FiltroCantJugadoresProps> = ({
    filtros,
    manejarFiltro,
}) => {
    const opcionesFiltro = [1, 2, 3];

    return (
        <div className="flex flex-row items-start">
            <label
                htmlFor="cantidad-jugadores"
                className="m-2 flex items-center font-bold"
            >
                Filtrar por :
            </label>
            {opcionesFiltro.map((cantidad) => (
                <label
                    key={cantidad}
                    htmlFor={`jugador-${cantidad}`}
                    className="m-2 flex items-center"
                >
                    <input
                        id={`jugador-${cantidad}`}
                        type="checkbox"
                        className="h-5 w-5 accent-green-800"
                        value={cantidad}
                        onChange={() => manejarFiltro(cantidad)}
                        checked={filtros.includes(cantidad)}
                    />
                    <span className="ml-2 font-bold">
                        {cantidad} Jugador{cantidad > 1 ? "es" : ""}
                    </span>
                </label>
            ))}
        </div>
    );
};

export default FiltroCantJugadores;
