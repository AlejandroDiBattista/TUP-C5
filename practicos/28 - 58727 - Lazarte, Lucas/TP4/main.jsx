const API_KEY = 'ac1bedc08e7f273588929355e6e3662f';

const mapeoDeIconos = {
    "01d": "01d.svg",
    "01n": "01n.svg",
    "02d": "02d.svg",
    "02n": "02n.svg",
    "03d": "03d.svg",
    "03n": "03n.svg",
    "04d": "04d.svg",
    "04n": "04n.svg",
    "09d": "09d.svg",
    "09n": "09n.svg",
    "10d": "10d.svg",
    "10n": "10n.svg",
    "11d": "11d.svg",
    "11n": "11n.svg",
    "13d": "13d.svg",
    "13n": "13n.svg",
    "50d": "50d.svg",
    "50n": "50n.svg"
};

function App() {
    const [nombreCiudad, setNombreCiudad] = useState('Barcelona');
    const [datosClima, setDatosClima] = useState(null);
    const [mensajeError, setMensajeError] = useState(null);

    const listaCiudades = ['Tucumán', 'Salta', 'Buenos Aires'];

    useEffect(() => {
        obtenerClima(nombreCiudad);
    }, [nombreCiudad]);

    const obtenerClima = async (nombreCiudad) => {
        try {
            setMensajeError(null);
            const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nombreCiudad}&units=metric&appid=${API_KEY}&lang=es`);
            if (!respuesta.ok) {
                throw new Error('Ciudad no encontrada');
            }
            const datos = await respuesta.json();
            setDatosClima(datos);
        } catch (error) {
            setMensajeError(error.message);
            setDatosClima(null);
        }
    };

    const cambiarCiudad = (e) => {
        setNombreCiudad(e.target.value);
    };

    const manejarSubmit = (e) => {
        e.preventDefault();
        obtenerClima(nombreCiudad);
    };

    return (
        <div className="contenedorClima">
            <header>
                <h1>Clima</h1>
                <nav>
                    {listaCiudades.map(ciudad => (
                        <button key={ciudad} onClick={() => setNombreCiudad(ciudad)}>{ciudad}</button>
                    ))}
                </nav>
            </header>

            <form onSubmit={manejarSubmit} role="search">
                <input
                    type="search"
                    value={nombreCiudad}
                    onChange={cambiarCiudad}
                    placeholder="Buscar ciudad"
                    required
                />
            </form>
            {mensajeError && <p className="error">{mensajeError}</p>}
            {datosClima && (
                <div className="tarjetaClima">
                    <h2>{datosClima.name}</h2>
                    <hr />
                    <img src={`./iconos/${mapeoDeIconos[datosClima.weather[0].icon]}`} alt={datosClima.weather[0].description} />
                    <hr />
                    <p className="temperatura">Temperatura: {datosClima.main.temp}°C</p>
                    <p>Mínima: {datosClima.main.temp_min}°C / Máxima: {datosClima.main.temp_max}°C</p>
                    <p>Humedad: {datosClima.main.humidity}%</p>
                </div>
            )}
        </div>
    );
}