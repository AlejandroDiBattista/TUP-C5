const API_KEY = "30d38b26954359266708f92e1317dac0";
const { useState } = React;

const App = () => {
  return (
    <>
      <div className="app">
        <Formulario />
      </div>
    </>
  );
};

const Encabezado = ({ seleccionarCiudad }) => {
  const handleClick = (e, city) => {
    e.preventDefault();
    seleccionarCiudad(city);
  };

  return (
    <>
      <nav className="cuerpo-encabezado">
        <ul>
          <li>
            <strong>Clima</strong>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#" onClick={(e) => handleClick(e, "Tucuman")}>
              Tucuman
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => handleClick(e, "Salta")}>
              Salta
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => handleClick(e, "Buenos Aires")}>
              Buenos Aires
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

const Navegacion = ({ nuevaUbi, ciudadInicial }) => {
  const [ciudad, setCiudad] = useState(ciudadInicial || "");

  const onSubmit = (e) => {
    e.preventDefault();
    if (ciudad === "" || !ciudad) return;
    nuevaUbi(ciudad);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  };

  useEffect(() => {
    if (ciudadInicial) {
      setCiudad(ciudadInicial);
      nuevaUbi(ciudadInicial);
    }
  }, [ciudadInicial]);

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="search"
          placeholder="ciudad"
          aria-label="Search"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </form>
    </div>
  );
};

const Formulario = () => {
  const [clima, setClima] = useState({});
  const [loading, setLoading] = useState(false);
  const [mostrar, setMostrar] = useState(false);
  const [ubicacion, setUbicacion] = useState("");

  const obClima = async (ubi) => {
    setLoading(true);
    setUbicacion(ubi);

    const urlclima = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&lang=es&q=${ubi}`;
    try {
      const response = await fetch(urlclima);
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      const climaData = await response.json();
      setClima(climaData);
      setMostrar(true);
    } catch (error) {
      setMostrar(false);
      console.error(error);
      setClima({});
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Encabezado seleccionarCiudad={obClima} />
      <Navegacion nuevaUbi={obClima} ciudadInicial={ubicacion} />
      <Tarjeta mostrarData={mostrar} clima={clima} />
    </>
  );
};

const getIconName = (description) => {
  if (
    description.includes("nub") ||
    description.includes("nube") ||
    description.includes("cloud")
  ) {
    return "cloudy.svg";
  } else if (
    description.includes("soleado") ||
    description.includes("despejado") ||
    description.includes("claro")
  ) {
    return "clear-day.svg";
  } else if (
    description.includes("lluvia") ||
    description.includes("lluvioso") ||
    description.includes("rain")
  ) {
    return "drizzle.svg";
  } else if (
    description.includes("polvo") ||
    description.includes("humo") ||
    description.includes("smoke") ||
    description.includes("dust")
  ) {
    return "smoke.svg";
  }
  return "default.svg";
};

const Tarjeta = ({ clima, mostrarData }) => {
  let iconDescription = "";
  let iconName = "default.svg";

  if (mostrarData && clima.weather && clima.weather.length > 0) {
    iconDescription = clima.weather[0].description;
    iconName = getIconName(iconDescription);
  }

  return (
    <>
      {mostrarData ? (
        <article>
          <header>
            <h2>{clima.name}</h2>
          </header>
          <img src={`./icons/${iconName}`} alt={iconDescription} />
          <p>{iconDescription}</p>
          <footer>
            <h3>
              <strong>Temperatura: </strong>
              {(clima.main.temp - 273.15).toFixed(1)}°
            </h3>
            <div className="footer-row">
              <h4>
                <strong>Mínima: </strong>
                {(clima.main.temp_min - 273.15).toFixed(1)}°
              </h4>
              <h4>
                <strong>Máxima: </strong>
                {(clima.main.temp_max - 273.15).toFixed(1)}°
              </h4>
            </div>
            <h4>
              <strong>Humedad: </strong>
              {clima.main.humidity}%
            </h4>
          </footer>
        </article>
      ) : (
        <h2>Sin datos</h2>
      )}
    </>
  );
};
