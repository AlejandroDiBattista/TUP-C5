const API_KEY = '30d38b26954359266708f92e1317dac0';
const { useState, useEffect } = React;

function fetchWeather(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`)
        .then(response => response.json());
}

function Weather({ city }) {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        fetchWeather(city).then(data => {
            if (data.cod === 200) {
                setWeatherData(data);
            } else {
                console.error('Error en la solicitud:', data.message);
            }
        });
    }, [city]);

    if (!weatherData) return <p>Cargando...</p>;
    if (weatherData.cod !== 200) return <p>Ciudad no encontrada</p>;

    const weather = weatherData.weather[0];
    const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}.png`;

    return (
        <div>
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <img className="weather-icon" src={iconUrl} alt={weather.description} />
            <p className="temp">Temperatura actual: {weatherData.main.temp}°C</p>
            <p>Temperatura mínima: {weatherData.main.temp_min}°C</p>
            <p>Temperatura máxima: {weatherData.main.temp_max}°C</p>
            <p>Humedad: {weatherData.main.humidity}%</p>
        </div>
    );
}

function CitySelector({ onCityChange }) {
    const handleCityClick = (city) => () => onCityChange(city);

    return (
        <nav>
            <ul>
                <li><button onClick={handleCityClick('Tucuman')}>Tucumán</button></li>
                <li><button onClick={handleCityClick('Salta')}>Salta</button></li>
                <li><button onClick={handleCityClick('Buenos Aires')}>Buenos Aires</button></li>
            </ul>
        </nav>
    );
}

function CitySearch({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
            setQuery('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="buscar">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar ciudad"
                required
                className="buscar"
            />
            <button type="submit">Buscar</button>
        </form>
    );
}

function App() {
    const [city, setCity] = useState('Tucuman');

    return (
        <div>
            <h1>Clima</h1>
            <CitySelector onCityChange={setCity} />
            <CitySearch onSearch={setCity} />
            <Weather city={city} />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)
