const API_KEY = '23327a57599f02469b251b2bccc012eb';

function App() {
    const [city, setCity] = useState('Barcelona');
    const [weather, setWeather] = useState(null);
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWeather(city);
    }, [city]);

    const fetchWeather = async (cityName) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`);
            const data = await response.json();
            if (response.ok) {
                setWeather(data);
                setError(null);
            } else {
                setError(data.message);
                setWeather(null);
            }
        } catch (error) {
            setError('Error fetching weather data');
            setWeather(null);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() !== '') {
            setCity(query);
        }
    };

    return (
        <>
            <nav>
                <ul>
                    <li><h1>Clima</h1></li>
                </ul>
                <ul>
                    <li><a onClick={() => setCity('Tucuman')}>Tucuman</a></li>
                    <li><a onClick={() => setCity('Salta')}>Salta</a></li>
                    <li><a onClick={() => setCity('Buenos Aires')}>Buenos Aires</a></li>
                </ul>
            </nav>

            <form onSubmit={handleSearch}>
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar ciudad"
                />
                {/* <button type="submit">Buscar</button> */}
            </form>
            {error && <p>{error}</p>}
            {weather && (
                <div className="weather-container">
                    <h2>{weather.name}</h2>
                    <img src={`./iconos/${weather.weather[0].icon}.svg`} alt="weather icon" />
                    <p>Temperatura: {weather.main.temp}°C</p>
                    <p>Mínima: {weather.main.temp_min}°C / Máxima: {weather.main.temp_max}°C</p>
                    <p>Humedad: {weather.main.humidity}%</p>
                </div>
            )}
        </>
    );
}