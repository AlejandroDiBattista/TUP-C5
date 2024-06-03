const { useState } = React

function App() {
    const [ciudad, setCiudad] = useState('')
    const [datosClima, setDatosClima] = useState(null)
    const [imagen, setImagen] = useState("./img/03d.svg")
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        setCiudad(e.target.value)
        setError(false)
    }

    const handleClick = async (e) => {
        e.preventDefault()
        setError(false)
        const nuevaCiudad = e.target.textContent
        const datos = await ApiCallClima(nuevaCiudad)
        if (datos.status === 200) {        
            setDatosClima(datos.data)
            setImagen(`./img/${datos.data.weather[0].icon}.svg`)
        }
        else { setError(true) }
    }

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            const datos = await ApiCallClima(ciudad)
            if (datos.status === 200) {
                setDatosClima(datos.data)
                setImagen(`./img/${datos.data.weather[0].icon}.svg`)
                setCiudad("")
            }
            else { 
                setError(true)
                setCiudad("")
             }
        }
    }

    return (
        <div className="container">
            <nav>
                <ul>
                    <li><strong className="colorParrafo">Clima</strong></li>
                </ul>
                <ul>
                    <li><a onClick={handleClick} href="#">Tucuman</a></li>
                    <li><a onClick={handleClick} href="#">Salta</a></li>
                    <li><a onClick={handleClick} href="#">Buenos Aires</a></li>
                </ul>
            </nav>
            <input
                type="search"
                name="search"
                placeholder={error ? "Ciudad no encontrada" : "Search"}
                aria-label="Search"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={ciudad}
            />
            {datosClima ? (
                <article>
                    <header className="header">
                        <p className="colorParrafo">{datosClima.name},{datosClima.sys.country}</p>
                    </header>
                    <div className="imagenes">
                        <img src={imagen ? imagen : "./img/NubladoN.svg"} alt="weather icon" />
                    </div>
                    <footer className="footer">
                        <p className="colorParrafo">Temperatura: {datosClima.main.temp} °C</p>
                        <p>Mínima: {datosClima.main.temp_min} °C / Máxima: {datosClima.main.temp_max} °C</p>
                        <p>Humedad: {datosClima.main.humidity} %</p>
                    </footer>
                </article>
            ) : error ? (<div className="titulos"><h2 className="error1">Ciudad no encontrada</h2></div>) : (<div className="titulos"><h2 className="titu">Busque una ciudad</h2></div>)}
        </div>
    )
}

