const { useState } = React;

//Componente Principal
function App() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState('');

    const handleSearch = async (nombreCiudad) => {
        // Api de openweathermap
        const apiKey = 'ecf442398977c3fe04c711c2af5ad84a';
        let nombreCiudadParametro = '';

        switch (nombreCiudad) {
            case 'Tucumán':
                nombreCiudadParametro = 'San Miguel de Tucumán';
                break;
            case 'Salta':
                nombreCiudadParametro = 'Salta, Argentina';
                break;
            case 'Buenos Aires':
                nombreCiudadParametro = 'Ciudad Autónoma de Buenos Aires';
                break;
            default:
                nombreCiudadParametro = nombreCiudad;
                break;
        }

        // Llamada a la API
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${nombreCiudadParametro}&appid=${apiKey}&units=metric&lang=es`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            setWeatherData(data);
            setWeatherIcon(`./contenido/${data.weather[0].icon}.svg`);
        } else {
            console.error('Error en la solicitud:', data.message);
        }
    };

    // Renderizar el componente App
    return (
        <div className="Clima">
            <nav>
                <ul>
                    <li><h1 style={{ color: 'black' }}>Clima</h1></li>
                </ul>
                <ul>
                    <li><a href="#" onClick={() => handleSearch('Tucumán')}>Tucuman</a></li>
                    <li><a href="#" onClick={() => handleSearch('Salta')}>Salta</a></li>
                    <li><a href="#" onClick={() => handleSearch('Buenos Aires')}>Buenos Aires</a></li>
                </ul>
            </nav>
            <form role="search" onSubmit={(e) => { e.preventDefault(); handleSearch(city); }}>
                <input
                    name="search"
                    type="search"
                    placeholder="Buscar"
                    autoComplete="off"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <input type="submit" value="Buscar" />
            </form>
            {weatherData && weatherData.cod === 200 && (
                <article data-theme="light" className="card">
                    <header>
                        <h3>{weatherData.name}, {weatherData.sys.country}</h3>
                    </header>
                    <div className="weather-content">
                        <img src={weatherIcon} alt="Weather Icon" />
                    </div>
                    <footer>
                        <h4>Temperatura Actual: {weatherData.main.temp} °C</h4>
                        <p>Clima: {weatherData.weather[0].description}</p>
                        <hr />
                        <p>Mínima: {weatherData.main.temp_min} °C / Máxima: {weatherData.main.temp_max} °C</p>
                        <p>Humedad: {weatherData.main.humidity} %</p>
                    </footer>
                </article>
            )}
        </div>
    );
}