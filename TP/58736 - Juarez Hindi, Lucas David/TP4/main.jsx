const { useState, useEffect } = React;

const icons = (icon) => {
  switch (icon) {
    case 'Thunderstorm':
      icon = './icons/thunderstorms-rain.svg';
      console.log("tormenta");
      break;
    case 'Drizzle':
      icon = './icons/drizzle.svg';
      console.log('LLOVIZNA');
      break;
    case 'Rain':
      icon = './icons/rain.svg';
      console.log('LLUVIA');
      break;
    case 'Snow':
      icon = './icons/snowy.svg';
      console.log('NIEVE');
      break;
    case 'Clear':
      icon = './icons/clear-day.svg';
      console.log('LIMPIO');
      break;
    case 'Atmosphere':
      icon = './icons/weather.svg';
      console.log('ATMOSFERA');
      break;
    case 'Clouds':
      icon = './icons/fog.svg';
      console.log('NUBES');
      break;
    case 'Fog':
      icon = './icons/fog.svg';
      console.log('NUBES');
      break;
    case 'Haze':
      icon = './icons/haze.svg';
      console.log('BRUMAS');
      break;
    case 'Smoke':
      icon = './icons/smoke.svg';
      console.log('HUMO');
      break;
    default:
      icon = './icons/clear-day.svg';
      console.log('LIMPIO');
  }
  return icon;
}

function App() {
  const [search, setSearch] = useState('');
  const [value, setValues] = useState(null);
  const [icon, setIcon] = useState('');

  const API_KEY = '30d38b26954359266708f92e1317dac0';
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=es&units=metric&appid=${API_KEY}`;

  const getData = async () => {
    await fetch(URL)
      .then(response => response.json())
      .then(data => {
        if (data.cod >= 400) {
          setValues(false);
        } else {
          console.log(data);
          console.log(data.weather[0].main);
          setIcon(icons(data.weather[0].main));
          setValues(data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      console.log(e.target.value);
      setSearch(e.target.value);
    }
  }

  const handleCityClick = (city) => {
    setSearch(city);
  }

  useEffect(() => {
    if (search) {
      getData();
    }
  }, [search]);

  return (
    <>
      <h1>Clima</h1>
      <div className="card">
        {value ? (
          <div className="card-container">
            <h1 className="city-name">{value.name}</h1>
            <p className="temp">{value.main.temp.toFixed(0)}&deg;</p>
            <img className="icon" src={icon} alt={value.weather[0].description} />
            <div className="card-footer">
              <p className="temp-max-min">{value.main.temp_min.toFixed(0)}&deg; | {value.main.temp_max.toFixed(0)}&deg;</p>
            </div>
          </div>
        ) : (
          <h1>{"Ciudad no reconocida"}</h1>
        )}
        <nav>
          <ul>
            <li><strong></strong></li>
          </ul>
          <ul>
            <li><a href="#" onClick={() => handleCityClick('Tucuman')}>Tucuman</a></li>
            <li><a href="#" onClick={() => handleCityClick('Buenos Aires')}>Buenos Aires</a></li>
            <li><a href="#" onClick={() => handleCityClick('Salta')}>Salta</a></li>
          </ul>
        </nav>
        <input
          type="search"
          name="search"
          placeholder="Search"
          aria-label="Search"
          onKeyDown={handleSearch}
        />
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
