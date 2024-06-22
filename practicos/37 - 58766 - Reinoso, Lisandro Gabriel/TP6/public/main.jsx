const FormularioRegistro = ({ vista }) => {
    const [usuario, setUsuario] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [mensaje, setMensaje] = useState("")

    const valorNombre = (e) => setUsuario(e.target.value)
    const valorContraseña = (e) => setContraseña(e.target.value)

    const handleClick = async () => {
        if (usuario !== "" && contraseña !== "") {

            let datos = { usuario, contraseña }
            const response = await fetch("http://localhost:3000/registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            })
            let data = await response.json()
            console.log(data)
            setMensaje(data.me)
        }
        else {
            setMensaje("Complete los campos para poder registrarse")
        }
    }

    return (
        <>
            <h1>Registro</h1>
            <form onSubmit={e => e.preventDefault()}>
                <input type="text" value={usuario} onChange={valorNombre} placeholder="Nombre de usuario" />
                <input type="password" value={contraseña} onChange={valorContraseña} placeholder="Contraseña" />
                <input type="submit" onClick={handleClick} value={"Registrarse"} />
                <h6>Si ya estas registrado hace {<a href="#" onClick={vista}>click aqui</a>}  para iniciar sesion</h6>
                <p>{mensaje}</p>
            </form>
        </>
    )
}


const FormularioLogin = ({ vista, logueado }) => {
    const [usuario, setUsuario] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [mensaje, setMensaje] = useState("")

    const valorNombre = (e) => setUsuario(e.target.value)
    const valorContraseña = (e) => setContraseña(e.target.value)

    const handleClick = async () => {
        if (usuario !== "" && contraseña !== "") {

            let datos = { usuario, contraseña }
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(datos)
            })
            let data = await response.json()
            setMensaje(data.me)
            data.logueado ? logueado(true) : logueado(false)   
        }
        else {
            setMensaje("Complete los campos para poder iniciar sesion")
        }
    }

    return (
        <>
            <h1>Inicio de sesion</h1>
            <form onSubmit={e => e.preventDefault()}>
                <input type="text" value={usuario} onChange={valorNombre} placeholder="Nombre de usuario" />
                <input type="password" value={contraseña} onChange={valorContraseña} placeholder="Contraseña" />
                <input type="submit" onClick={handleClick} value={"Iniciar Sesion"} />
                <h6>Si no estas registrado hace {<a href="#" onClick={vista}>click aqui</a>}  para registrarse</h6>
                <p>{mensaje}</p>
            </form>
        </>

    )
}

const CerrarSesion = ({cerroSesion}) => {
    const putFecth = async () =>{
        let response = await fetch("http://localhost:3000/logout", {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
        })
        let data = await response.json()
        cerroSesion(false)
    }
    return (
        <div className="cerrar-sesion">
            <h2>Informacion</h2>
            <button onClick={putFecth}>Cerrar Sesion</button>
        </div>
    )
}

function App() {
    const [vista, setVista] = useState(false)
    const [logueado, setLogueado] = useState(false)
    function mostrar() {
        setVista(!vista)
    }

    function seLogueo(estado) {
        setLogueado(estado)
    }

    return (
        <div>
          {logueado ? (<CerrarSesion cerroSesion={seLogueo}/>) : (vista ? (<FormularioRegistro vista={mostrar} />) : 
                                                                          (<FormularioLogin vista={mostrar} logueado={seLogueo} />)
          )}
        </div>
    )
}
