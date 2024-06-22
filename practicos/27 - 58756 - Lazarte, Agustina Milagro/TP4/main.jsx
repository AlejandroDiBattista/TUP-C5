const API_KEY = '30d38b26954359266708f92e1317dac0'

function App() {
    const [city, setCity] = useState('Tucuman')
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchWeatherData(city)
    }, [city])

    const fetchWeatherData = async (cityName) => {
        setLoading(true)
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
        const data = await response.json()
        setWeatherData(data)
        setLoading(false)
    }

    const handleCityChange = (e) => {
        setCity(e.target.value)
    }

    const handleCitySubmit = (e) => {
        e.preventDefault()
        fetchWeatherData(city)
    }

    return (
        <div>
            <h1>Clima</h1>
            <nav>
                <ul>
                    <li><a href="#" onClick={() => setCity('Tucuman')}>Tucuman</a></li>
                    <li><a href="#" onClick={() => setCity('Salta')}>Salta</a></li>
                    <li><a href="#" onClick={() => setCity('Buenos Aires')}>Buenos Aires</a></li>
                </ul>
            </nav>
            <form onSubmit={handleCitySubmit}>
                <input type="text" value={city} onChange={handleCityChange} />
                <button type="submit">Buscar</button>
            </form>
            {loading ? <p>Cargando...</p> : <WeatherInfo data={weatherData} />}
        </div>
    )
}

function WeatherInfo({ data }) {
    if (!data || data.cod !== 200) {
        return <p>Ciudad no encontrada</p>
    }

    const { name, main, weather } = data
    const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

    return (
        <div>
            <h2>{name}</h2>
            <img src={weatherIcon} alt={weather[0].description} />
            <p>Temperatura: {main.temp} °C</p>
            <p>Temperatura Mínima: {main.temp_min} °C</p>
            <p>Temperatura Máxima: {main.temp_max} °C</p>
            <p>Humedad: {main.humidity} %</p>
            
        </div>
    )
}
