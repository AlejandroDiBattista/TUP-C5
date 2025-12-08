const { useState } = React

const FormRegistro = ({setRegistrar})=>{
    const [form, setForm] = useState({
        usuario: '',
        correo: '',
        contraseña: ''
        })
    const [error, setError] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [comprobacion, setComprobacion] = useState('')
    const handleRegistrar = async (e)=>{
        e.preventDefault()
        if(form.usuario === '' || form.correo === '' || form.contraseña === ''){
            alert('Introduce valores en los campos')
        }
        else{
            if(comprobacion !== form.contraseña){
                alert('Las contraseñas no coinciden')
            }
            else{
                try {
                    const respuesta = await fetch('/registrar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(form)
                    })
                    const datos = await respuesta.text()
                    setMensaje(datos)
                    setError('')
                } catch (error) {
                    setError('Error al registrar: ' + error.message)
                }
            }
        }
    }
    const handleChange = (e)=>{
        e.preventDefault()
        const {name, value} = e.target
        setForm(prevState=>({
            ...prevState, [name] : value
        }))
    }
    const handleCancelar = (e)=>{
        e.preventDefault()
        setRegistrar(false)
    }

   return (
   <>
   <form>
        <label htmlFor="usuario">Usuario</label>
        <input type="text" name="usuario" value={form.usuario} onChange={handleChange}/>
        <label htmlFor="correo">Mail</label>
        <input type="mail" name="correo" value={form.correo} onChange={handleChange} />
        <label htmlFor="contraseña">Contraseña</label>
        <input type="password" name="contraseña" value={form.contraseña} onChange={handleChange} />
        <label htmlFor="repetircontraseña">Repita la contraseña</label>
        <input type="password" name="repetircontraseña" value={comprobacion} onChange={(e)=>setComprobacion(e.target.value)} />
        <button onClick={handleRegistrar} >Registrar</button>
        <button onClick={handleCancelar} >Regresar</button>
    </form>
    {error ? error : mensaje}
    </>
    )
}

const Info = ({ datos }) => {
    return (<>
    <div className="info">
        <h2>Usuario: {datos.usuario}</h2>
        <h2>Contraseña: {datos.contraseña}</h2>
        <h2>Correo:  {datos.correo}</h2>
        <h2>Token: {datos.token}</h2>
        
    </div>
    </>)
}
const Login = ({ datos, setLogin }) => {
    const logout = async () => {
        try {
            const respuesta = await fetch('/logout', {
                method: 'PUT',
                credentials: 'include'
            });
            const data = await respuesta.text()
            if (data === 'Usuario deslogueado') {
                setLogin(false)
            }
        } catch (error) {
            console.error('Error al desloguear:', error)
        }
    }
    const [mostrarInfo, setMostrarInfo] = useState(false)
    return (<>
    <div className="login">
        <h2>Bienvenido {datos.usuario}</h2>
        {mostrarInfo ? <Info datos={datos} /> : <button onClick={() => setMostrarInfo(true)}>Mostrar Informacion</button>}
        <button onClick={() => { logout() }}>Desloguearse</button>
    </div>
    </>)
}
const Form = ({registrando, logueando, setUsuario}) => {
    const [form, setForm] = useState({
        usuario: '',
        contraseña: ''
    })
    const [mensaje, setMensaje] = useState('')
    const [error, setError] = useState('')
    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleRegistrar = async (e) => {
        e.preventDefault()
       registrando(true)
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        if (form.contraseña === '' || form.usuario === '') {
            setError('Introduce valores en todos los campos')
            return
        }
        try {
            const respuesta = await fetch('/login', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
            const data = await respuesta.json()
            const { usuario, contraseña, mensaje, token, correo } = data
            console.log(data)
            if (mensaje === 'Logueado con exito') {
                logueando(true)
                setUsuario({ usuario, contraseña, token, correo})
            } else {
                setLogin(false)
                setError(mensaje)
            }
        } catch (error) {
            setError('Error al iniciar sesión: ' + error.message)
        }
    }
    return (<>
          <div className="card-form">
    {mensaje ? mensaje : error}
             <h1>VacasFood</h1>
            <form>
                <label htmlFor="usuario">Ingresa tu usuario</label>
                <input type="text" name="usuario" value={form.usuario} onChange={handleChange} /> <br />
                <label htmlFor="contraseña">Contraseña</label>
                <input type="password" name="contraseña" value={form.contraseña} onChange={handleChange} /> <br />
                <button onClick={handleRegistrar}>Registrar</button> <br />
                <button onClick={handleLogin}>Login</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div> 
    </>)
}
function App() {
    const [usuario, setUsuario] = useState({})
    const [registrar, setRegistrar] = useState(false)
    const [login, setLogin] = useState(false)
    return (<>
        {login ? (
                <Login datos={usuario} setLogin={setLogin}/>
            ) : registrar ? (
                <FormRegistro setRegistrar={setRegistrar} />
            ) : (
                <Form registrando={setRegistrar} logueando={setLogin} setUsuario={setUsuario} />
            )}
        </>
    )
}