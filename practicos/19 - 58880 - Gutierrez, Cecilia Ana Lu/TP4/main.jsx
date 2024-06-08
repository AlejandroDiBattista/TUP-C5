
const API_KEY = 'f49144bfd386051b141e117114cdb4f8'
function App() {
    const [ciudad, setCiudad] = useState('Barcelona');
    const [weather, setClima] = useState(null);
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWeather(ciudad);
    }, [ciudad]);

    const Search = (e) => {
        e.preventDefault();
        if (query.trim() !== '') {
            setCiudad(query);
        }
    };

    const fetchWeather = async (nomCiudad) => {
        try {                            
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nomCiudad}&units=metric&appid=${API_KEY}`);
            const data = await response.json();
            if (response.ok) {
                setClima(data);
                setError(null);
                console.log(data)
            } else {
                setError(data.message);
                setClima(null);
            }
        } catch (error) {
            setError('Error al buscar clima');
            setClima(null);
        }
    };

    return <>
            <nav>
                <ul>
                  <li><strong>CLIMA</strong></li>
                </ul>
                <ul>
                  <li><a onClick={() => setCiudad('Tucuman')}>Tucuman</a></li>
                  <li><a onClick={() => setCiudad('Salta')}>Salta</a></li>
                  <li><a onClick={() => setCiudad('Buenos Aires')}>Buenos Aires</a></li>
                </ul>
            </nav>
        <form className="buscador" onSubmit={Search}>
            <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ingresar Ciudad"
            />
        </form>
        {error && <p>{error}</p>}
        {weather && (
        <div class="tarjeta">
            <header>{weather.name}</header>
            <img src={`./ClimaIconos/${weather.weather[0].icon}.svg`} alt="Iconos Clima" />
                    <h2>Temperatura: {weather.main.temp}°C</h2>
                    <p>Mínima: {weather.main.temp_min}°C / Máxima: {weather.main.temp_max}°C</p>
                    <p>Humedad: {weather.main.humidity}%</p>
        </div>
        
     )}
    </>
}