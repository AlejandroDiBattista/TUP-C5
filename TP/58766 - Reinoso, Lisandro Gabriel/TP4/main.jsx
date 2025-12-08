const { useState, useEffect } = React

const ComunicacionConLaApi = ({ ciudad, setJsonCiudad }) => {
    const API_KEY = "450e95f6498095d16f7b2786b1d89f88"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`
    useEffect(() => {
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(datos => {
                setJsonCiudad(datos)
                console.log(datos)
            })
            .catch(error => console.log("Error en la api " + error))
    }, [ciudad])
}

const ParteSuperior = ({ setCiudad, jsonCiudad }) => {

    function buscarCiudad(event) {
        setCiudad(event.target.value)
    }

    const icoSegunClima = (codigoIcono) => {
        return `openweathermap/${codigoIcono}.svg`
    }

    return (
        <>
            <nav>
                <h1>Clima</h1>
                <ul>
                    <li><a href="#" onClick={() => setCiudad("Tucuman")}>Tucuman</a></li>
                    <li><a href="#" onClick={() => setCiudad("Salta")}>Salta</a></li>
                    <li><a href="#" onClick={() => setCiudad("Buenos Aires")}>Buenos Aires</a></li>
                </ul>
            </nav>
            <input type="search" name="search" placeholder="Buscar Ciudad" aria-label="Search" className="input-search" onChange={buscarCiudad} />
            {
                jsonCiudad && jsonCiudad.main && jsonCiudad.weather[0].icon ? (
                    <article>
                        <header>{jsonCiudad.name}</header>
                        <img src={icoSegunClima(jsonCiudad.weather[0].icon)} />
                        <footer>
                            <h3>Temperatura: {Math.floor(jsonCiudad.main.temp - 273.15).toFixed(2)}°C</h3>
                            <p>Maxima: {Math.round(jsonCiudad.main.temp_max - 273.15).toFixed(2)}°C  /  Minima: {Math.floor(jsonCiudad.main.temp_min - 273.15).toFixed(2)}°C</p>
                            <p>Humedad: {jsonCiudad.main.humidity}</p>
                        </footer>
                    </article>
                ) : (<>
                 <h4>Ciudad no encontrada</h4>
                    <h4>Escriba o termine de escribir el nombre de la ciudad para conocer su clima</h4>
                </>
                   
                )
            }
        </>
    )
}

function App() {
    const [ciudad, setCiudad] = useState("")
    const [jsonCiudad, setJsonCiudad] = useState(null)

    return <>
        <ComunicacionConLaApi ciudad={ciudad} setJsonCiudad={setJsonCiudad} />
        <ParteSuperior setCiudad={setCiudad} jsonCiudad={jsonCiudad} />
    </>
}
