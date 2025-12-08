const { useState, useEffect } = React;
const { render } = ReactDOM;

const API_KEY = 'f6e271751a4289088a21d5627e02d0d7';

const cities = [
    { name: 'Tucuman', code: 'Tucuman' },
    { name: 'Salta', code: 'Salta' },
    { name: 'Buenos Aires', code: 'Buenos Aires' },
];

const WeatherApp = () => {

    const [query, setQuery] = useState('Tucuman');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (query) {
            fetchWeather(query);
        }
    }, [query]);

    useEffect(() => {
        fetchWeather('Tucuman'); 
    }, []);

    const fetchWeather = async (city) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`);
            setWeather(response.data);
            setError(null);
        } catch (error) {
            setError('Ciudad no encontrada');
            setWeather(null);
        }
        setLoading(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() !== '') {
            fetchWeather(query);
        }
    };

    const handleCityChange = (cityCode) => {
        setQuery(cityCode);
    };

    return (
        <div className="container">
            <div className="Clima">
                <header>
                    <h1>Clima</h1>
                </header>
                <nav className="ciudades">
                    <ul>
                        {cities.map((city) => (
                            <li key={city.code}>
                                <a href="#" onClick={() => handleCityChange(city.code)}>
                                    {city.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <main>
                <form onSubmit={handleSubmit} className="busqueda-form">
                <div className="search-container">
                    <input 
                         type="text" 
                         placeholder="Buscar ciudad..." 
                         value={query} 
                         onChange={(e) => setQuery(e.target.value)} 
                        className="busqueda-input"
                   />
                    <i className="fa fa-search search-icon"></i>
</div>

                </form>
                {loading && <p>Cargando...</p>}
                {error && <div className="error">{error}</div>}
                {weather && (
                    <div className="tarjeta">
                        <article>
                            <header className="NombreCiudad"><strong>{weather.name}</strong></header>
                            <img src={`./iconos/${weather.weather[0].icon}.svg`} alt="Icono del clima" />
                            <footer>
                                <p className="TempCiudad"><strong>Temperatura: {weather.main.temp}°C</strong></p>
                                <p>Mínima: {weather.main.temp_min}°C / Máxima: {weather.main.temp_max}°C</p>
                                <p>Humedad: {weather.main.humidity}%</p>
                            </footer>
                        </article>
                    </div>
                )}
            </main>
        </div>
    );
};

render(<WeatherApp />, document.getElementById('root'));
