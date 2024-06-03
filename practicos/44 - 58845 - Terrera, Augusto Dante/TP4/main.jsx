const { useState, useEffect } = React

const API_KEY = 'b03fd696f9ce7c9263a13c984bc89291'

function App() {
  const [data, setData] = useState(null)
  const [ciudad, setCiudad] = useState('')
  const [weatherIcon, setWeatherIcon] = useState('')

  const getWeather = async (city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      const result = await response.json()
      if (result.cod === 200) {
        setData(result)
      } else {
        console.error("Ciudad no encontrada")
        setData(null)
      }
    } catch (error) {
      console.error("Error al obtener los datos del clima", error)
    }
  }

  useEffect(() => {
    if (ciudad) {
      getWeather(ciudad)
    }
  }, [ciudad])
  useEffect(() => {
    if (data && data.weather && data.weather[0].icon) {
      setWeatherIcon(`./contenido/${data.weather[0].icon}.svg`)
    }
  }, [data])

  const alBuscar = (e) => {
    setCiudad(e.target.value)
  }

  const alPresionar = (e) => {
    if (e.key === 'Enter') {
      getWeather(ciudad)
    }
  }

  const alBuscarCiudad = (city) => {
    setCiudad(city)
    getWeather(city)
  }

  return (
    <>
      <div className="encabezado">
        <h1>Clima</h1>
        <div className="enlaces">
          <a href="#" onClick={() => alBuscarCiudad('Tucumán')}>Tucumán</a>
          <a href="#" onClick={() => alBuscarCiudad('Salta')}>Salta</a>
          <a href="#" onClick={() => alBuscarCiudad('Buenos Aires')}>Buenos Aires</a>
        </div>
      </div>
      <input
        type="search"
        name="search"
        placeholder="Buscar"
        onChange={alBuscar}
        onKeyDown={alPresionar}
      />
      {data && (
        <article data-theme="light">
          <header>{data.name}</header>
          <section>
            <img src={weatherIcon} alt={data.weather[0].description} />
          </section>
          <footer>
            <h2>Temperatura: {data.main.temp} °C</h2>
            <p>Mínima: {data.main.temp_min} °C / Máxima: {data.main.temp_max} °C</p>
            <p>Humedad: {data.main.humidity} %</p>
          </footer>
        </article>
      )}
    </>
  )
}
