const API_KEY = '35473853d959feb864a8723ff5b09162';
const App = () => {
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [currentCity, setCurrentCity] = useState("");
    const [inputValue, setInputValue] = useState("");
    const cityNames = {
        tucuman: 'Tucumán',
        salta: 'Salta',
        buenosaires: 'Buenos Aires',
    };
    const getWeatherData = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setWeatherInfo(data);
        } catch (error) {
            console.error("Error fetching weather data: ", error);
        }
    };
    useEffect(() => {
        if (currentCity) {
            getWeatherData(currentCity);
        }
    }, [currentCity]);
    const selectCity = (city) => {
        setCurrentCity(city);
    };
    const updateInputValue = (event) => {
        setInputValue(event.target.value);
    };
    const executeSearch = () => {
        setCurrentCity(inputValue);
        setInputValue("");
    };
    const onKeyDown = (event) => {
        if (event.key === "Enter") {
            executeSearch();
        }
    };
    return (
        <>
            <nav>
                <div className="titulo">
                    <ul>
                        <li><h1>Clima</h1></li>
                    </ul>
                </div>

                <div className="ciudades">
                    <ul>
                        <li><a href="#" onClick={() => selectCity(cityNames.tucuman)}>Tucumán</a></li>
                        <li><a href="#" onClick={() => selectCity(cityNames.salta)}>Salta</a></li>
                        <li><a href="#" onClick={() => selectCity(cityNames.buenosaires)}>Buenos Aires</a></li>
                    </ul>
                </div>
            </nav>

            <div className="buscador">
                <input
                    type="Search"
                    placeholder="Buscar"
                    value={inputValue}
                    onChange={updateInputValue}
                    onKeyDown={onKeyDown}
                />
            </div>

            <section>
                {weatherInfo && (
                    <div className="card">
                        <h2>{weatherInfo.name}</h2>
                        <hr />
                        <img src={`./img/${weatherInfo.weather[0].icon}.svg`} alt="icono clima" />
                        <hr />
                        <div className="temperatura">
                            <h3>Temperatura: {weatherInfo.main.temp}°C</h3>
                            <div className="minima">
                                <p>Mínima: {weatherInfo.main.temp_min}°C / Máxima: {weatherInfo.main.temp_max}°C</p>
                                <p>Humedad: {weatherInfo.main.humidity}%</p>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}