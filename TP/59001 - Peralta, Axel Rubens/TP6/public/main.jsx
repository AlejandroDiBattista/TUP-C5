function App() {
    const [datos, setdatos] = React.useState({})
    let [home, sethome] = React.useState(true)
    
    return home ? <Registrox setdatos={setdatos} sethome={sethome}/> : <MostrarInformacion datos={datos} sethome={sethome}/>
}

function MostrarInformacion({datos, sethome}) {
    const [verdatos, setverdatos] = React.useState(false)

    async function logout() {
        let res = await fetch('http://localhost:3000/logout', {
            method: 'PUT',
			credentials: 'include'
        })
        sethome(true)
    }

    async function info() {
         let res = await fetch('http://localhost:3000/info',{
            method: 'GET',
            credentials: 'include'
        })
        setverdatos(true)
    }

    return(<><h1>2do Parcial Laboratorio</h1>
            <button onClick={info}>Mostrar Informacion</button>

            <button onClick={logout}>Logout</button>
            {verdatos && (
                <div>
                    <p>Usuario:{datos.usuario}</p>
                    <p>Correo:{datos.correo}</p>
                    <p>Contraseña:{datos.contraseña}</p>
                </div>
            )}
    </>) 
}

function Registrox({setdatos, sethome}) {
    let [usuario, setusuario] = React.useState('')
    let [correo, setcorreo] = React.useState('')
    let [contraseña, setcontraseña] = React.useState('')
    let [logueando, setlogueando] = React.useState(false)
    

    async function registrar(e) {
        e.preventDefault()
        let res = await fetch('http://localhost:3000/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                { usuario, correo, contraseña })
        })
        let data = await res.text()
        if(res.status===201) setlogueando(true)
        alert(data)
        setusuario('')
        setcorreo('')
        setcontraseña('')
    }

    async function login(e) {
        e.preventDefault()
        let res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario, contraseña
            })
        })
        let data = await res.json()
        alert(data.mensaje)
        if(res.status===201) {
            setdatos(data.datos)
            sethome(false)
            console.log(data.datos)
        }
        
    }

    return logueando ? ( 
        <div className="container">
            <h1>Bienvenido!</h1>
            <form>
                <div className="items">
                    <label>Usuario:</label>
                    <input type="text" id="usuario" name="usuario" value={usuario} onChange={(e)=>setusuario(e.target.value)}></input>
                </div>
                <div className="items">
                    <label>Contraseña:</label>
                    <input type="text" id="contraseña" name="contraseña" value={contraseña} onChange={(e)=>setcontraseña(e.target.value)}></input>
                </div>
                <button className="btn" onClick={login}>Ingresar</button>
                <div className="intercambio">
                    <p>No tienes una cuenta?</p>
                    <a onClick={()=>setlogueando(false)}>Registrarse</a>
                </div>
            </form>
        </div>
    )
    : ( 
        <div className="container">
            <h1>Bienvenido!</h1>
            <form>
                <div className="items">
                    <label>Usuario:</label>
                    <input type="text" id="usuario" name="usuario" value={usuario} onChange={(e)=>setusuario(e.target.value)}></input>
                </div>
                <div className="items">    
                    <label>Correo:</label>
                    <input type="correo" id="correo" name="correo" value={correo} onChange={(e)=>setcorreo(e.target.value)}></input>
                </div>
                <div className="items">
                    <label>Contraseña:</label>
                    <input type="text" id="contraseña" name="contraseña" value={contraseña} onChange={(e)=>setcontraseña(e.target.value)}></input>
                </div>
                <button className="btn" onClick={registrar}>Registrarse</button>
                <div className="intercambio">
                    <p>Ya tienes una cuenta?</p>
                    <a onClick={()=>setlogueando(true)}>Login</a>
                </div>
            </form>
        </div>
    )
}