
const {useState} = React

const API_KEY = 'ab2dd8f179371fa18f76cca72f25001d'

function App() {
    const [ciudad, setCiudad] = useState('')
    const [temp, setTemp] = useState(null)
    const [tempmin, setTempmin] = useState(null)
    const [tempmax, setTempmax] = useState(null)
    const [icon, setIcon] = useState(null)
    const [humedad, setHumedad]= useState(null)
    const [nombre, setNombre] = useState('')
    const llamarApi = async (ciudad) => {
        try{
            const responde = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`)
            const datos = await responde.json()
            return datos 
        }
        catch(er){
            alert('Hay error en la llamada en la api: ' + er)
            return
        }
         
    }
    const calcularTemp = (respuesta)=>{
        const celsius = parseFloat(respuesta) - 273.15;
        return celsius.toFixed(2)
    }
    const buscar = async (ciudad)=>{
        const datos = await llamarApi(ciudad)
        const {temp_min, temp_max, temp, humidity} = datos.main;
        setTemp(calcularTemp(temp))
        setTempmax(temp_max)
        setTempmin(temp_min)
        setIcon(datos.weather[0].icon)
        setHumedad(humidity)
        setNombre(datos.name)
    }
    const buscarInput = (e, ciudad)=>{
        e.preventDefault()
        buscar(ciudad)
    }
    useEffect(()=>{
        buscar('barcelona')
    },[])
    return (
        <>
        <div className='container'>
        <nav className="nav-contenedor">
          <ul>
            <li className="nombre-nav"><strong>Clima</strong></li>
        </ul>
        <ul>
            <li><a onClick={()=>buscar('San Miguel de Tucuman')} className="lista-nav">Tucuman</a></li>
            <li><a onClick={()=>buscar('Salta')} className="lista-nav">Salta</a></li>
            <li><a onClick={()=>buscar('Buenos Aires')} className="lista-nav">Buenos Aires</a></li>
        </ul>
</nav>
          <form onSubmit={(e)=>buscarInput(e, ciudad)}>
        <input type="search" name="search" placeholder="Search" aria-label="Search" value={ciudad} onChange={(e)=>setCiudad(e.target.value)} className="buscador"/>
        <button type="submit" aria-label="Search"className="boton-buscar"></button>
        </form>
        <article className="card">
  <header className="nombre"><strong>{!nombre ? 'Tiempo' : nombre}</strong></header>
        <div className="fuera-div">
            <div className="dentro-div">    
                <img src={`./imagenes/${icon}.svg`}  alt="Icono" className="img-icono"/> 
            </div>
        </div>
  <footer className="footer">
        <span className="temperatura">Temperatura: {temp}</span> <br />
        <span className="minima-maxima">Mínima: {tempmin}°C / Máxima: {tempmax}°C</span> <br />
        <span className="humedad">Humedad: {humedad}%</span>
  </footer>
</article>
    </div>
        </>
    )
}