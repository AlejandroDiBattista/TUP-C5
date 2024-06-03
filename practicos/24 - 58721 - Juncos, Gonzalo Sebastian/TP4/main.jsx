const { useState, useEffect } = React
const API_KEY = '30d38b26954359266708f92e1317dac0'
function Appclima() {

     
        const [clima, setClima] = useState(null);
        const [ciudadElegida, setCiudadElegida] = useState('Tucuman');
        const [entradaBuscar, setEntradaBuscar] = useState("");
        const [urlIcono, setUrlIcono] = "./iconos/01d.svg/"
       
    
        const obtenerClima = async (ciudad) => {
            try {
                const respuesta = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric`
                );
                const datos = await respuesta.json();
                setClima(datos);
                console.log(datos)
                setUrlIcono(`./iconos/${datos.weather[0].icon}.svg`)
                console.log(urlIcono)
            } catch (error) {
                console.log("Error al obtener datos del clima:");
            }
        };
    
        useEffect(() => {
            obtenerClima(ciudadElegida);
        }, [ciudadElegida]);
    
        const manejarClickCiudad = (ciudad) => setCiudadElegida(ciudad);
        const cambioEntradaBuscar = (evento) => setEntradaBuscar(evento.target.value);
        const manejarBuscar = () => {
            setCiudadElegida(entradaBuscar);
            setEntradaBuscar("");
        };
        const manejarTeclaApretada = (evento) => {
            if (evento.key === "Enter") manejarBuscar();
        };
    
        return (
            <>
                <nav>
                    <ul>
                        <li><strong>CLIMA</strong></li>
                    </ul>
                    <ul className="ciudades">
                        {["Tucuman", "Salta", "Buenos Aires"].map(ciudad => (
                            <li key={ciudad}>
                                <a href="#" onClick={() => manejarClickCiudad(ciudad)}>{ciudad}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <input
                    className="buscar"
                    type="search"
                    placeholder="Buscar"
                    aria-label="Buscar"
                    value={entradaBuscar}
                    onChange={cambioEntradaBuscar}
                    onKeyDown={manejarTeclaApretada}
                />
                {clima && (
                    <div className="Ciudad_Clima">
                        <article className="datos">
                            <header><h2>{ciudadElegida}, {clima.sys.country}</h2></header>
                            <div className="iconos">
                                <img src={`./iconos/${clima.weather[0].icon}.svg`} alt="Icono del Clima" onError={(e) => e.target.style.display = 'none'} />
                            </div>
                            <footer>
                                <h2>Temperatura: {clima.main.temp}°C</h2>
                                <p>Mínima: {clima.main.temp_min}°C / Máxima: {clima.main.temp_max}°C</p>
                                <p>Humedad: {clima.main.humidity}%</p>
                            </footer>
                        </article>
                    </div>
                )}
            </>
        );
    };

