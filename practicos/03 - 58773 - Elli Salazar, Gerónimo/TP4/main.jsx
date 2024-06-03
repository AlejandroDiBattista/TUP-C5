const API_KEY = '30d38b26954359266708f92e1317dac0';
const { useState, useEffect } = React;

function fetchWeather(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`)
        .then(response => response.json());
}

function Weather({ city }) {
    const [weather, setWeather] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState('');

    useEffect(() => {
        fetchWeather(city).then(data => {
            if (data.cod === 200) {
                setWeather(data);
                setWeatherIcon(`./openweathermap/${data.weather[0].icon}.svg`);
            } else {
                console.error('Error en la solicitud:', data.message);
            }
        });
    }, [city]);

    if (!weather) return <p>Cargando...</p>;
    if (weather.cod !== 200) return <p>Ciudad no encontrada</p>;

    return (
        <div>
            <h2>{weather.name}, {weather.sys.country}</h2>
            <img className="weather-icon" src={weatherIcon} alt={weather.weather[0].description} />
            <p className="temp">Temperatura actual: {weather.main.temp}°C</p>
            <p>Temperatura mínima: {weather.main.temp_min}°C</p>
            <p>Temperatura máxima: {weather.main.temp_max}°C</p>
            <p>Humedad: {weather.main.humidity}%</p>
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

ReactDOM.render(<App />, document.getElementById('root'));
