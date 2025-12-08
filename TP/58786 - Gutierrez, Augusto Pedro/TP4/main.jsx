const { useState, useEffect } = React;

const API_KEY = '30d38b26954359266708f92e1317dac0';

const fetchWeatherData = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`);
    const data = await response.json();
    return data;
};

const cities = ['Tucuman', 'Salta', 'Buenos Aires'];

function App() {
  const [city, setCity] = useState('Tucuman');
  const [weatherData, setWeatherData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
      fetchWeatherData(city).then(data => setWeatherData(data));
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      setCity(searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <div className="container-fluid w-100 h-100 p-4">
      <div className="row w-100 h-100">

        <div className="col-12 w-100 ps-5 d-flex justify-content-star align-items-center">
          <h1 className="h1">Clima</h1>
        </div>
      
        <div className="col-12 w-100 pe-5 d-flex justify-content-end align-items-center gap-4">
            {cities.map((cityName) => (
                <button key={cityName} onClick={() => setCity(cityName)} className="btn btn-info">
                    {cityName}
                </button>
            ))}
        </div>

        <div className="col-12 w-100 ps-5 pe-5 d-flex justify-content-center align-items-center p-4">
          <form onSubmit={handleSearch} className="w-100 d-flex flex-column justify-content-center align-items-start">
              <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar ciudad"
                  className="form-control w-100"
              />
              <button type="submit" className="btn btn-info mt-4">Buscar</button>
          </form>
        </div>
        
        <div className="col-12 w-100 d-flex justify-content-center align-items-center">
          {weatherData && (
            <div className="card w-75 border border-1 rounded-2">
                <div className="card-body">
                    <h2 className="card-title">{weatherData.name}</h2>
                    <p className="card-text">
                        <strong>Temperatura:</strong>{weatherData.main.temp}°C<br />
                        <strong>Mínima:</strong>{weatherData.main.temp_min}°C<br />
                        <strong>Máxima:</strong>{weatherData.main.temp_max}°C<br />
                        <strong>Humedad:</strong>{weatherData.main.humidity}%<br />
                        <strong>Descripción:</strong>{weatherData.weather[0].description}<br />
                    </p>
                    <div>
                      {weatherData && weatherData.weather[0].description && (
                        <div>
                            <strong>Alerta Meteorológica:</strong> Dia con {weatherData.weather[0].description}
                        </div>
                      )}
                    </div>
                    <img
                      src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                      alt="weather icon"
                    />
                </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
