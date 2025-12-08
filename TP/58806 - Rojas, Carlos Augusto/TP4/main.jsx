const {useState,useEffect} = React

const App = () => {
    const [nombreCiudad,setNombreCiudad] = useState('Barcelona')
    const [ciudad,setCiudad] = useState(null)
    const [error,setError] = useState(null)
    console.log(ciudad)
    const buscarCiudad = async(nombreCiudad) => {
        try{
            const API_KEY= '3444075eddd22ce4e911bd78d69b45d8'
            const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nombreCiudad}&appid=${API_KEY}`) 
            if(!respuesta.ok){
                throw new Error("Ciudad no encontrada")
            }
            const datos = await respuesta.json()
            setCiudad(datos)
            setError("")
            console.log(ciudad)
        }
        catch(error){
            setError(error.message)
            setCiudad(null)
        }
    }
    useEffect(() => {
        buscarCiudad(nombreCiudad)
    }, []);


    return (
        <>
        <nav className="nav">
        <ul>
        <li><strong className="clima">Clima</strong></li>
        </ul>
      <ul>
          <li className="lista" onClick={()=>buscarCiudad('San Miguel de Tucuman')}>Tucuman</li>
          <li className="lista" onClick={()=>buscarCiudad('Salta')}>Salta</li>
          <li className="lista" onClick={()=>buscarCiudad('Buenos Aires')}>Buenos Aires</li>
        </ul>
      </nav>
        <form onSubmit={e=>{
            if(e.key='Enter'){
                e.preventDefault();
                buscarCiudad(nombreCiudad)
            }
        }}>
          <input
          className="buscador"
            type="search"
            name="search"
            placeholder="Buscar"
            pattern="[A-Za-z\s]+"
            onChange={(e)=>setNombreCiudad(e.target.value)} required
            />
            </form>
        {error && (
                <div>
                    {alert(error)}
                    {setError()}
                </div>
         )}
            
        {ciudad && 
          <article className="card">
            <header>{ciudad.name}</header>
            <img src={`imagenes/${ciudad.weather[0].icon}.svg`} alt="Icono del clima" />
            <footer>
              <h1 className="temp">Temperatura:{(ciudad.main.temp - 273.15).toFixed(2)}</h1>
              <span className="max">Máxima: {(ciudad.main.temp_max - 273.15).toFixed(2)}°C / Mínima: {(ciudad.main.temp_min - 273.15).toFixed(2)}°C</span> <br />
              <span className="min">Humedad: {ciudad.main.humidity}</span>
            </footer>
          </article>
        }
        </>
      )
}

