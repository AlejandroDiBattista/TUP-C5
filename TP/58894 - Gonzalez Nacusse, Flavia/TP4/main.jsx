const API_KEY = 'cb960c54a336dfac850605f816253e75';

const iconoMap = {
    '01d': '01d.svg', 
    '01n': '01n.svg', 
    '02d': '02d.svg', 
    '02n': '02n.svg', 
    '03d': '03d.svg', 
    '03n': '03n.svg', 
    '04d': '04d.svg', 
    '04n': '04n.svg', 
    '09d': '09d.svg', 
    '09n': '09n.svg', 
    '10d': '10d.svg', 
    '10n': '10n.svg', 
    '11d': '11d.svg',
    '11n': '11n.svg',
    '13d': '13d.svg',
    '13n': '13n.svg',
    '50d': '50d.svg', 
    '50n': '50n.svg', 
};

function WeatherInfo({ city }) {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (!city) return;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    setWeather(data);
                } else {
                    setWeather(null);
                }
            })
            .catch(error => {
                console.error("Error al obtener datos meteorológicos:", error);
                setWeather(null);
            });
    }, [city]);

    if (!weather) {
        return <p>No se pudo obtener la información del clima.</p>;
    }

    const icon = iconoMap[weather.weather[0].icon];
    const iconUrl = `./iconos/${icon}`;

    return (
        <article className="clima-info">
            <header>{weather.name}</header>
            <img src={iconUrl} alt={weather.weather[0].description} className="clima-icono"/>
            <h2>Temperatura: {weather.main.temp} °C</h2>
            <p>Mínima: {weather.main.temp_min} °C / Máxima: {weather.main.temp_max} °C</p>
            <p>Humedad: {weather.main.humidity} %</p>
        </article>
    );
}

function App() {
    const [city, setCity] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleCityClick = (nombreCiudad) => {
        setCity(nombreCiudad);
        setSearchQuery(nombreCiudad); 
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmedQuery = searchQuery.trim();
        setCity(trimmedQuery);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    return (
        <>
            <nav className="navegador">
                <h1>Clima</h1>
                <ul>
                    <li><a href="#" onClick={() => handleCityClick('Tucuman')}>Tucumán</a></li>
                    <li><a href="#" onClick={() => handleCityClick('Salta')}>Salta</a></li>
                    <li><a href="#" onClick={() => handleCityClick('Buenos Aires')}>Buenos Aires</a></li>
                </ul>
            </nav>
            <form role="search" onSubmit={handleSearch} className="search-form">
                <div className="search-container">
                    <i className="fas fa-search search-icon"></i>
                    <input 
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
            </form>
            <WeatherInfo city={city} />
        </>
    );
}
