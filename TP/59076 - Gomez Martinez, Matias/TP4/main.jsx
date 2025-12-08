const { useState, useEffect } = React;

const Clima = ({ datos }) => {
    const iconoDelClima = datos.weather[0].icon;
    return <>
        <article className="clima">
            <header><h1>{datos.name}</h1></header>
            <div className="climaIcono">
                <img src={`Iconos/${iconoDelClima}.svg`} alt="Icono_del_clima" />
            </div>
            <footer>
                <h3>Temperatura: {datos.main.temp}°C </h3>
                <p>Minima: {datos.main.temp_min}°C / Máxima: {datos.main.temp_max}°C</p>
                <p>Humedad: {datos.main.humidity}</p>
            </footer>
        </article>
    </>
}

const Nav = ({ cambioCiudad }) => (
    <nav className="navYsearch">
        <ul className="nav">
            <ul>
                <li>
                    <h2 className="tituloNav">Clima</h2>
                </li>
            </ul>
            <ul className="navegador">
                <li>
                    <a className="ciudadNav" onClick={() => cambioCiudad('Tucumán')} >

                        <h4>Tucumán</h4>
                    </a>
                </li>
                <li>
                    <a className="ciudadNav" onClick={() => cambioCiudad('Salta')}>
                        <h4>Salta</h4>
                    </a>
                </li>
                <li>
                    <a className="ciudadNav" onClick={() => cambioCiudad('Buenos Aires')}>
                        <h4>Buenos Aires</h4>
                    </a>
                </li>
            </ul>
        </ul>
        <ul>
            <input
                type="search"
                name="search"
                placeholder="Buscar ciudad"
                aria-label="Search"
                onChange={e => cambioCiudad(e.target.value)}
            />
        </ul>
    </nav>
)

function App() {
    const [ciudad, setCiudad] = useState('Tucumán');
    const [datos, setDatos] = useState(null);
    const API_KEY = '30d38b26954359266708f92e1317dac0'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric`;

    const handleCambioCiudad = (nuevaCiudad) => {
        setCiudad(nuevaCiudad);
    };

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Error en el envio de la solicitud: ' + res.statusText);
                }
                return res.json();
            })
            .then(datos => {
                setDatos(datos)
            })
            .catch(error => {
                console.error('Error en la busqueda: ' + error);
            });
    }, [url]);


    return <>
        <div className="main">
            <Nav cambioCiudad={handleCambioCiudad} />
            {datos ? (
                <Clima datos={datos} />
            ) : (
                <p>Cargando....</p>
            )}
        </div>
    </>
}