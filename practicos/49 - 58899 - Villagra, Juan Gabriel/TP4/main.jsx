const API_KEY = '16dc1505ffc81bd9dee2cfe4393f32ed';
const { useState, useEffect } = React;

function App() {
    const [ciudadActual, setCiudadActual] = useState("");
    const [climaDatos, setClimaDatos] = useState(null);
    const [mensajeError, setMensajeError] = useState(null);
    const [ciudadBusqueda, setCiudadBusqueda] = useState("");

    useEffect(() => {
        if (ciudadActual) fetchClimaDatos(ciudadActual);
    }, [ciudadActual]);

    const fetchClimaDatos = async (ciudad) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`);
            if (!response.ok) throw new Error('Ciudad no encontrada');
            const data = await response.json();
            setClimaDatos(data);
            setMensajeError(null);
        } catch (error) {
            setMensajeError(error.message);
            setClimaDatos(null);
        }
    };

    const handleBusquedaChange = (event) => setCiudadBusqueda(event.target.value);

    const handleBusquedaSubmit = (event) => {
        event.preventDefault();
        if (ciudadBusqueda) {
            setCiudadActual(ciudadBusqueda);
            setCiudadBusqueda("");
        }
    };

    const handleCiudadClick = (ciudad) => setCiudadActual(ciudad);

    return (
        <div className="container">
            <header>
                <h1>Clima</h1>
                <nav className="links">
                    <ul>
                        <li><a href="#" onClick={() => handleCiudadClick("Tucuman")}>Tucumán</a></li>
                        <li><a href="#" onClick={() => handleCiudadClick("Buenos Aires")}>Buenos Aires</a></li>
                        <li><a href="#" onClick={() => handleCiudadClick("Salta")}>Salta</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <form onSubmit={handleBusquedaSubmit} className="buscarCiudad">
                    <input 
                        type="text" 
                        placeholder="Ciudad.." 
                        value={ciudadBusqueda} 
                        onChange={handleBusquedaChange} 
                        className="buscarr"
                    />
                </form>
                {mensajeError && <div className="error">{mensajeError}</div>}
                {climaDatos && !mensajeError && (
                    <div className="cardClima">
                        <article>
                            <header className="nomCiudad"><strong>{climaDatos.name}</strong></header>
                            <img src={`./iconos/${climaDatos.weather[0].icon}.svg`} alt="Icono del clima" />
                            <footer className="datos">
                                <p className="temp"><strong>Temperatura: {climaDatos.main.temp}°C</strong></p>
                                <p>Temperatura Mínima: {climaDatos.main.temp_min}°C</p>
                                <p>Temperatura Máxima: {climaDatos.main.temp_max}°C</p>
                                <p>Humedad: {climaDatos.main.humidity}%</p>
                            </footer>
                        </article>
                    </div>
                )}
            </main>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));