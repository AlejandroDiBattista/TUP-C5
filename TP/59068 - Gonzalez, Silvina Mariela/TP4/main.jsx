const { useState, useEffect } = React;

const Navegacion = ({ onCityChange }) => (
    <nav className="navegacion-y-busqueda">
        <ul className="navegacion">
            <ul>
                <li>
                    <h2 className="navegacion-titulo"> Clima </h2>
                </li>
            </ul>
            <ul className="navegador">
                <li>
                    <a className="navegador-item" onClick={() => onCityChange('Tucuman')}>
                        <h6>  Tucumán </h6>
                    </a>
                </li>
                <li>
                    <a className="navegador-item" onClick={() => onCityChange('Salta')}>
                        <h6> Salta </h6>
                    </a>
                </li>
                <li>
                    <a className="navegador-item" onClick={() => onCityChange('Buenos Aires')}>
                        <h6> Buenos Aires </h6>
                    </a>
                </li>
            </ul>
        </ul>
        <ul>
            <input
                type="search"
                name="search"
                placeholder="Search"
                aria-label="Search"
                onChange={e => onCityChange(e.target.value)}
            />
        </ul>
    </nav>
)

const Clima = ({ datos }) => {
    const iconoDelClima = datos.weather[0].icon;

    return (
        <article className="clima-tarjeta">
            <header><h1>{datos.name}</h1></header>
            <div className="clima-icono">
                <img src={`weather-icons-master/${iconoDelClima}.svg`} alt="Icono_del_clima" />
            </div>
            <footer>
                <h3>Temperatura: {datos.main.temp}°C</h3>
                <p>Mínima: {datos.main.temp_min}°C / Máxima: {datos.main.temp_max}°C</p>
                <p>Humedad: {datos.main.humidity}</p>
            </footer>

        </article>
    )
}

function App() {
    const [ciudad, setCiudad] = useState('Salta');
    const [datosObtenidos, setDatosObtenidos] = useState(null);
    const API_KEY = 'e4a28e5a104bda2406af1dbfc125e3fd';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric`;

    useEffect(() => {
        fetch(url)
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error('Hubo un error al enviar la solicitud: ' + respuesta.statusText);
                }
                return respuesta.json();
            })
            .then(datos => {
                setDatosObtenidos(datos);
            })
            .catch(error => {
                console.error('Hubo un problema con la operación de búsqueda: ', error);
            });
    }, [url]);

    const handleCityChange = (nuevaCiudad) => {
        setCiudad(nuevaCiudad);
    };

    return (
        <div className="main">
            <Navegacion onCityChange={handleCityChange} />
            {datosObtenidos ? (
                <Clima datos={datosObtenidos} />
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}