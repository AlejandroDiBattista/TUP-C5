const { useState, useEffect } = React;

const API_KEY = '49a6bd38ef89a2bbdc008e64430acba6';

function App() {
    const [city, setCity] = useState('Tucuman');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWeather(city);
    }, [city]);

    const fetchWeather = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`);
            if (!response.ok) {
                throw new Error('Ciudad no encontrada');
            }
            const data = await response.json();
            setWeather(data);
            setError(null);
        } catch (error) {
            setError(error.message);
            setWeather(null);
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const city = event.target.elements.city.value.trim();
        if (city) {
            setCity(city);
        }
    };

    const getIconUrl = (icon) => {
        switch (icon) {
            case '01d': return 'icons/01d.svg';
            case '01n': return 'icons/01n.svg';
            case '02d': return 'icons/02d.svg';
            case '02n': return 'icons/02n.svg';
            case '03d': return 'icons/03d.svg';
            case '03n': return 'icons/03n.svg';
            case '04d': return 'icons/04d.svg';
            case '04n': return 'icons/04n.svg';
            case '09d': return 'icons/09d.svg';
            case '09n': return 'icons/09n.svg';
            case '10d': return 'icons/10d.svg';
            case '10n': return 'icons/10n.svg';
            case '11d': return 'icons/11d.svg';
            case '11n': return 'icons/11n.svg';
            case '13d': return 'icons/13d.svg';
            case '13n': return 'icons/13n.svg';
            case '50d': return 'icons/50d.svg';
            case '50n': return 'icons/50n.svg';
            default: return 'icons/01d.svg';
        }
    };

    return (
        <div>
            <nav>
                <ul>
                    <li><strong className="tituloclima">Clima</strong></li>
                </ul>
                <ul>
                    <li className="provincias"><a href="#" onClick={() => setCity('Tucuman')}>Tucuman</a></li>
                    <li className="provincias"><a href="#" onClick={() => setCity('Salta')}>Salta</a></li>
                    <li className="provincias"><a href="#" onClick={() => setCity('Buenos Aires')}>Buenos Aires</a></li>
                </ul>
            </nav>
            <form onSubmit={handleSearch}>
                <input
                    type="search"
                    name="city"
                    placeholder="Buscar"
                    aria-label="Buscar"
                />
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {weather && (
                <div className="weather-container">
                    <h2>{weather.name}</h2>
                    <img src={getIconUrl(weather.weather[0].icon)} alt="Weather icon" />
                    <div className="weather-details">
                        <p className="temperature">Temperatura: {weather.main.temp}°C</p>
                        <p>Mínima: {weather.main.temp_min}°C / Máxima: {weather.main.temp_max}°C</p>
                        <p>Humedad: {weather.main.humidity}%</p>
                    </div>
                </div>
            )}
        </div>
    );
}
const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(<App />);
