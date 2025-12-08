
const API_KEY = '30d38b26954359266708f92e1317dac0'

const { useState, useEffect } = React;

const App = () => {
  return (
    <div className="app">
      <WeatherForm />
    </div>
  );
};

const Header = ({ selectCity }) => {
  const handleCityClick = (e, city) => {
    e.preventDefault();
    selectCity(city);
  };

  return (
    <nav className="header">
      <ul>
        <li className="clima"><strong>Clima</strong></li>
      </ul>
      <ul>
        <li><a href="#" onClick={(e) => handleCityClick(e, "Tucuman")}>Tucuman</a></li>
        <li><a href="#" onClick={(e) => handleCityClick(e, "Salta")}>Salta</a></li>
        <li><a href="#" onClick={(e) => handleCityClick(e, "Buenos Aires")}>Buenos Aires</a></li>
      </ul>
    </nav>
  );
};

const WeatherCard = ({ weather, showData }) => {
    let description = "";
    let iconFilename = "default.svg";
  
    if (showData && weather.weather && weather.weather.length > 0) {
      description = weather.weather[0].description;
      iconFilename = getIconFilename(description);
    }
  
    return (
      <>
        {showData ? (
          <article>
            <header><h2>{weather.name}</h2></header>
            <img src={`./icons/${iconFilename}`} alt={description} />
            <p>{description}</p>
            <footer>
              <h3><strong>Temperatura: </strong>{(weather.main.temp - 273.15).toFixed(1)}°</h3>
              <div className="footer-row">
                <h4><strong>Mínima: </strong>{(weather.main.temp_min - 273.15).toFixed(1)}°</h4>
                <h4><strong>Máxima: </strong>{(weather.main.temp_max - 273.15).toFixed(1)}°</h4>
              </div>
              <h4><strong>Humedad: </strong>{weather.main.humidity}%</h4>
            </footer>
          </article>
        ) : (
          <h2>Sin datos</h2>
        )}
      </>
    );
  };

const CitySearch = ({ updateLocation, initialCity }) => {
  const [city, setCity] = useState(initialCity || "");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!city) return;
    updateLocation(city);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleFormSubmit(e);
    }
  };

  useEffect(() => {
    if (initialCity) {
      setCity(initialCity);
      updateLocation(initialCity);
    }
  }, [initialCity]);

  return (
    <div className="search-container">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Ciudad"
          aria-label="Buscar"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </form>
    </div>
  );
};

const WeatherForm = () => {
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [showData, setShowData] = useState(false);
  const [location, setLocation] = useState("");

  const fetchWeather = async (city) => {
    setLoading(true);
    setLocation(city);

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&lang=es&q=${city}`;
    try {
      const response = await fetch(weatherUrl);
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      const weatherData = await response.json();
      setWeather(weatherData);
      setShowData(true);
    } catch (error) {
      console.error(error);
      setWeather({});
      setShowData(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header selectCity={fetchWeather} />
      <CitySearch updateLocation={fetchWeather} initialCity={location} />
      <WeatherCard showData={showData} weather={weather} />
    </>
  );
};

const getIconFilename = (description) => {
  if (description.includes("nub") || description.includes("nube") || description.includes("cloud")) {
    return "cloudy.svg";
  } else if (description.includes("soleado") || description.includes("despejado") || description.includes("claro")) {
    return "clear-day.svg";
  } else if (description.includes("lluvia") || description.includes("lluvioso") || description.includes("rain")) {
    return "drizzle.svg";
  } else if (description.includes("polvo") || description.includes("humo") || description.includes("smoke") || description.includes("dust")) {
    return "smoke.svg";
  }
  return "default.svg";
};



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
