const API_KEY = '30d38b26954359266708f92e1317dac0';
const { useState, useEffect } = React;

function obtenerDatosClima(ciudad) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`)
        .then(response => response.json());
}

function InformacionClima({ ciudad }) {
    const [datosClima, setDatosClima] = useState(null);
    const [urlIcono, setUrlIcono] = useState('');

    useEffect(() => {
        obtenerDatosClima(ciudad).then(data => {
            if (data.cod === 200) {
                setDatosClima(data);
                setUrlIcono(`./openweathermap/${data.weather[0].icon}.svg`);
            } else {
                console.error('Error en la solicitud:', data.message);
                setDatosClima(null);
            }
        }).catch(error => {
            console.error('Error de red:', error);
            setDatosClima(null);
        });
    }, [ciudad]);

    if (!datosClima) return <p>Cargando...</p>;
    if (datosClima.cod !== 200) return <p>Ciudad no encontrada</p>;

    return (
        <div>
            <h2 className="datos">{datosClima.name}, {datosClima.sys.country}</h2>
            <img className="weather-icon" src={urlIcono} alt={datosClima.weather[0].description} />
            <p className="temp">Temperatura actual: {datosClima.main.temp}°C</p>
            <p>Temperatura mínima: {datosClima.main.temp_min}°C</p>
            <p>Temperatura máxima: {datosClima.main.temp_max}°C</p>
            <p>Humedad: {datosClima.main.humidity}%</p>
        </div>
    );
}

function BotonesCiudad({ onSeleccionarCiudad }) {
    const manejarClicCiudad = (ciudad) => () => onSeleccionarCiudad(ciudad);

    return (
        <nav>
            <ul>
                <li><button onClick={manejarClicCiudad('Tucuman')}>Tucumán</button></li>
                <li><button onClick={manejarClicCiudad('Salta')}>Salta</button></li>
                <li><button onClick={manejarClicCiudad('Buenos Aires')}>Buenos Aires</button></li>
            </ul>
        </nav>
    );
}

function FormularioBusquedaCiudad({ onBuscar }) {
    const [consultaBusqueda, setConsultaBusqueda] = useState('');

    const manejarEnvio = (e) => {
        e.preventDefault();
        if (consultaBusqueda.trim()) {
            onBuscar(consultaBusqueda);
            setConsultaBusqueda('');
        }
    };

    return (
        <form onSubmit={manejarEnvio} className="formulario-busqueda">
            <input
                type="text"
                value={consultaBusqueda}
                onChange={(e) => setConsultaBusqueda(e.target.value)}
                placeholder="Buscar ciudad"
                required
                className="input-busqueda"
            />
            <button type="submit">Buscar</button>
        </form>
    );
}

function App() {
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState('Tucuman');

    return (
        <div>
            <h1 className="datos">Clima</h1>
            <BotonesCiudad onSeleccionarCiudad={setCiudadSeleccionada} />
            <FormularioBusquedaCiudad onBuscar={setCiudadSeleccionada} />
            <InformacionClima ciudad={ciudadSeleccionada} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
