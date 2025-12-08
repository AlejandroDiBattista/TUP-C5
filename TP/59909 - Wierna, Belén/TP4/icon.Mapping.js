const { useState, useEffect } = React;
import { iconMapping } from "./iconMapping";

const API_KEY = '30d38b26954359266708f92e1317dac0';

function Clima({ ciudad }) {
    const [datosClima, setDatosClima] = useState(null);

    useEffect(() => {
        const obtenerClima = async () => {
            if (ciudad) {
                const respuesta = await fetch('https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es');
                const datos = await respuesta.json();
                setDatosClima(datos);
            }
        };

        obtenerClima();
    }, [ciudad]);

    if (!datosClima) return <p>Cargando...</p>;

    const { name, main, weather } = datosClima;
    const iconoMeteocon = iconMapping[weather[0].icon];
    const iconoUrl =`./icons/${iconoMeteocon}`;

    return (
        <div>
            <h2>{name}</h2>
            <img src={iconoUrl} alt={weather[0].description} />
            <p>Temperatura: {main.temp}°C</p>
            <p>Mínima: {main.temp_min}°C / Máxima: {main.temp_max}°C</p>
            <p>Humedad: {main.humidity}%</p>
        </div>
    );
}

function App() {
    const [ciudad, setCiudad] = useState('');

    const manejarBusqueda = (evento) => {
        if (evento.key === 'Enter') {
            setCiudad(evento.target.value);
        }
    };

    return (
        <>
            <h1>Clima</h1>
            <nav>
                <ul>
                    <li><a href="#" onClick={() => setCiudad('Tucuman')}>Tucuman</a></li>
                    <li><a href="#" onClick={() => setCiudad('Salta')}>Salta</a></li>
                    <li><a href="#" onClick={() => setCiudad('Buenos Aires')}>Buenos Aires</a></li>
                </ul>
            </nav>
            <input
                type="text"
                placeholder="Buscar ciudad..."
                onKeyDown={manejarBusqueda}
            />
            {ciudad && <Clima ciudad={ciudad} />}
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);