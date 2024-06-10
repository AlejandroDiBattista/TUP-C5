const { useState, useEffect } = React;
const API_KEY = '3b29521d80f18ec93c5faadd0d204708';

function AppdelClima() {
    const [clima, setClima] = useState(null);
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState('Tucuman');
    const [entradaBusqueda, setEntradaBusqueda] = useState("");
    const [error, setError] = useState(null);

    const obtenerClima = async (ciudad) => {
        try {
            const respuesta = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric`
            );
            if (!respuesta.ok) throw new Error('Error en la respuesta del servidor');
            const datos = await respuesta.json();
            setClima(datos);
            setError(null);
        } catch (error) {
            console.error("Error al obtener datos del clima:", error);
            setError('No se pudo obtener el clima de la ciudad solicitada.');
        }
    };

    useEffect(() => {
        obtenerClima(ciudadSeleccionada);
    }, [ciudadSeleccionada]);

    const manejarClickCiudad = (ciudad) => setCiudadSeleccionada(ciudad);
    const manejarCambioEntrada = (evento) => setEntradaBusqueda(evento.target.value);
    const manejarBusqueda = () => {
        setCiudadSeleccionada(entradaBusqueda);
        setEntradaBusqueda("");
    };
    const manejarTeclaPresionada = (evento) => {
        if (evento.key === "Enter") manejarBusqueda();
    };

    return (
        <div className="contenedorclima">
            <header>
                <h1>Clima</h1>
            </header>
            <nav>
                {["Tucuman", "Salta", "Buenos Aires"].map(ciudad => (
                    <button key={ciudad} onClick={() => manejarClickCiudad(ciudad)}>
                        {ciudad}
                    </button>
                ))}
            </nav>
            <form onSubmit={(e) => { e.preventDefault(); manejarBusqueda(); }}>
                <input
                    type="search"
                    placeholder="Buscar"
                    aria-label="Buscar"
                    value={entradaBusqueda}
                    onChange={manejarCambioEntrada}
                    onKeyDown={manejarTeclaPresionada}
                />
            </form>
            {error && <p className="error">{error}</p>}
            {clima && (
                <div className="tarjeta-clima">
                    <article className="datos">
                        <header><h2>{clima.name}, {clima.sys.country}</h2></header>
                        <div className="iconos">
                            <img 
                                src={`./iconos/${clima.weather[0].icon}.svg`} 
                                alt="Icono del Clima" 
                                onError={(e) => e.target.style.display = 'none'} 
                            />
                        </div>
                        <footer>
                            <h2>Temperatura: {clima.main.temp}°C</h2>
                            <p>Mínima: {clima.main.temp_min}°C / Máxima: {clima.main.temp_max}°C</p>
                            <p>Humedad: {clima.main.humidity}%</p>
                        </footer>
                    </article>
                </div>
            )}
        </div>
    );
}