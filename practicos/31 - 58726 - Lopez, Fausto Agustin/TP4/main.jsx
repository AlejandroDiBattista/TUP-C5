const { useState} = React

const API_KEY = '93951a508fe22a447e261696e6eb30e4'

function App() {
    const [ciudad, setCiudad] = useState('')
    const [datos, setDatos] = useState(null)

    const buscarClima = async (city) => {
        const datas = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        if (datas.status === 200) {
            const data = await datas.json()
            setDatos(data)
        }
    }

    const cambiarCiudad = (e) => setCiudad(e.target.value) 

    const unclick = (e) => {
        const city = e.target.textContent
        buscarClima(city)
    }

    const buscar = (e) => {
        if(e.key === "Enter") buscarClima(ciudad) 
    }

    return (
        <>
            <nav>
                <ul>
                    <li><h1>Clima</h1></li>
                </ul>
                <ul>
                    <li><a href="#" onClick={unclick}>Tucumán</a></li>
                    <li><a href="#" onClick={unclick}>Salta</a></li>
                    <li><a href="#" onClick={unclick}>Buenos Aires</a></li>
                </ul>
            </nav>
            <input
                onKeyDown={buscar}
                type="search"
                value={ciudad}
                onChange={cambiarCiudad}
                placeholder="Buscar ciudad"
            />

            {datos && (<article>
                <h2>{datos.name}</h2>
                <div className="imagen">
                    <img src={`./meteocons/${datos.weather[0].icon}.svg`} alt="Clima icono"></img>
                </div>
                <p className="temperatura">Temperatura: {datos.main.temp}°C</p>
                <p>Mínima: {datos.main.temp_min}°C / Máxima: {datos.main.temp_max}°C</p>
                <p>Humedad: {datos.main.humidity}%</p>
            </article>)}
        </>
    )
}