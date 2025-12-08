const API_KEY = '5c76b26334704ecf6dee1d4c907ada18';

function Weather({ data }) {
    const { name, main, weather } = data;
    const iconUrl = './export/wi_partly-cloudy-day.svg';
    
    return (
        <div className="weather-card">
            <h2>{name}</h2>
            <img src={iconUrl} alt={weather[0].description} />
            <div className="temperature">
               <h2> <p>Temperatura: {main.temp}°C</p></h2>
                <p>Minima: {main.temp_min}°C / Maxima: {main.temp_max}°C</p>
                <p>Humedad: {main.humidity}</p>
            </div>
        </div>
    );
}

function App() {
    const [city, setCity] = useState('Tucumán');
    const [weatherData, setWeatherData] = useState(null);

    const fetchWeather = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Ciudad no encontrada.');
                } else {
                    throw new Error('Error al obtener los datos del clima.');
                }
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error('Error al obtener datos del clima:', error.message);
            if (error.message === 'Ciudad no encontrada.') {
                setWeatherData(null);
            }
        }
    };

    useEffect(() => {
        fetchWeather(city);
    }, [city]);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetchWeather(city);
    };

    return (
        <div className="container">
            <h1>Clima</h1>
            <nav>
                <ul>
                    <li><a href="#" onClick={() => setCity('Tucumán')}>Tucumán</a></li>
                    <li><a href="#" onClick={() => setCity('Salta')}>Salta</a></li>
                    <li><a href="#" onClick={() => setCity('Buenos Aires')}>Buenos Aires</a></li>
                </ul>
            </nav>
            <form className="search-box" onSubmit={handleFormSubmit}>
                <input
                    type="search"
                    value={city}
                    onChange={handleCityChange}
                    placeholder="Buscar ciudad"
                />
            </form>
            {weatherData ? (
                <Weather data={weatherData} />
            ) : (
                <p>Ciudad no encontrada.</p>
            )}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
