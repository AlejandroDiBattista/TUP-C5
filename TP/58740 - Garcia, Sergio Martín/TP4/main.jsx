const { useState, useEffect } = React;
const API_KEY = 'd5cb6b3b028124ab20e0547e5be30212';

function obtenerClima(ciudad, setClima) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric`)
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('Error al obtener el clima');
            }
            return respuesta.json();
        })
        .then(datos => {
            setClima(datos);
        })
        .catch(error => {
            console.error("Error al obtener el clima", error);
        });
}

function clickenCiudad(ciudad, setSeleccionarCiudad) {
    setSeleccionarCiudad(ciudad);
}

function cambiar(e, setBuscar) {
    setBuscar(e.target.value);
}

function busqueda(buscar, setSeleccionarCiudad, setBuscar) {
    if (buscar.trim()) {
        setSeleccionarCiudad(buscar);
        setBuscar("");
    }
}

function enter(e, busqueda) {
    if (e.key === "Enter") {
        busqueda();
    }
}

function App() {
    const [clima, setClima] = useState(null);
    const [seleccionarCiudad, setSeleccionarCiudad] = useState("Manchester");
    const [buscar, setBuscar] = useState("");

    const url = clima ? `./openweathermap/${clima.weather[0].icon}.svg` : "";

    useEffect(() => {
        obtenerClima(seleccionarCiudad, setClima);
    }, [seleccionarCiudad]);

    const provincias = ["Tucumán", "Salta", "Buenos Aires"];

    return (
        <>
            <nav>
                <h1 className="titulo">Clima</h1>
                <ul className="provincias">
                    {provincias.map((ciudad, lugar) => (
                        <li key={lugar}>
                            <a href="#" className="ciudad" onClick={() => clickenCiudad(ciudad, setSeleccionarCiudad)}>
                                {ciudad}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <input
                className="buscar"
                type="search"
                name="search"
                placeholder="Buscar Ciudad"
                aria-label="Buscar"
                value={buscar}
                onChange={(e) => cambiar(e, setBuscar)}
                onKeyDown={(e) => enter(e, () => busqueda(buscar, setSeleccionarCiudad, setBuscar))}
            />

            <div className="Provincias">
                {clima && (
                    <article className="Info_del_clima">
                        <header className="Header">
                            <h2>{clima.name}</h2>
                        </header>
                        <div className="iconos">
                            <img src={url} alt="Icono del clima" />
                        </div>
                        <footer className="Footer">
                            <h2>Temperatura: {clima.main.temp}°C</h2>
                            <p>
                                Minima: {clima.main.temp_min}°C / Maxima: {clima.main.temp_max}°C
                            </p>
                            <p>Humedad: {clima.main.humidity}%</p>
                        </footer>
                    </article>
                )}
            </div>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);