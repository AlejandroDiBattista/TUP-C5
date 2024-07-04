function App() {

    const [formRegistro, setFormRegistro] = useState({ nombreUsuario: '', clave: '' });
    const [formLogin, setFormLogin] = useState({ nombreUsuario: '', clave: '' });
    const [estadoSesion, setEstadoSesion] = useState(false);
    const [mensajeError, setMensajeError] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');
    const [mensajeInfo, setMensajeInfo] = useState({ mensaje: '', nombreUsuario: '' });

    const cambioRegistro = (e) => {
        const { name, value } = e.target;
        setFormRegistro({ ...formRegistro, [name]: value });
        console.log(name, value);
    };

    const cambioLogin = (e) => {
        const { name, value } = e.target;
        setFormLogin({ ...formLogin, [name]: value });
        console.log(name, value);
    };

    const signupuser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formRegistro)
            });
            const data = await response.json();
            if (data.ok) {
                setMensajeExito(data.mensaje);
                setMensajeError('');
            } else {
                setMensajeError(data.mensaje);
                setMensajeExito('');
            }
        } catch (error) {
            console.error('Error al registrarse:', error);
        }
    };

    const loginuser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/iniciarSes', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formLogin)
            });
            const data = await response.json();
            console.log(data);
            if (data.ok) {
                setEstadoSesion(true);
                setMensajeExito(data.mensaje);
                setMensajeError('');
            } else {
                setMensajeError(data.mensaje);
                setMensajeExito('');
            }
        } catch (error) {
            console.error('Se produjo error al iniciar sesión:', error);
        }
    };

    const infouser = async () => {
        try {
            const response = await fetch('/informacion', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            console.log(data);
            if (data.ok) {
                const infoNueva = {nombreUsuario: data.nombreUsuario };
                setMensajeInfo(infoNueva);
            } else {
                setMensajeError(data.mensaje);
                setMensajeExito('');
            }
        } catch (error) {
            console.error('Error al obtener la información de su usuario:', error);
        }
    };

    const closesession = async () => {
        try {
            const response = await fetch('/cerrarSes', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            if (data.ok) {
                setEstadoSesion(false);
                setMensajeExito(data.mensaje);
                setMensajeError('');
            } else {
                setMensajeError(data.mensaje);
                setMensajeExito('');
            }
        } catch (error) {
            console.error('Error al cerrar sesión', error);
        }
    };


    return (
        <div className="containerformularios">
            <h2 className="titulo">¡Inicia aquí!</h2>
            <div className="container-formuno">
                <div className="form-login">
                    <h3 className="h3login">Iniciar Sesión</h3>
                    <form className="form" onSubmit={loginuser}>
                        <div className="input-iniciosesion">
                            <input type="text" name="nombreUsuario" placeholder="Usuario" className="input" value={formLogin.nombreUsuario} onChange={cambioLogin}/>
                            <input type="password" name="clave" placeholder="Contraseña" className="input" value={formLogin.clave} onChange={cambioLogin}/>
                            <button type="submit" className="botonL">Iniciar Sesión</button>
                        </div>
                    </form>
                </div>
                <div className="form-registro">
                    <h2 className="subtitulo">Si no tienes usuario registrate aquí</h2>
                    <h2 className="h3registro">Registrarse</h2>
                    <form className="form" onSubmit={signupuser}>
                        <div className="input-registro">
                            <input type="text" name="nombreUsuario" placeholder="Usuario" className="input" value={formRegistro.nombreUsuario} onChange={cambioRegistro}/>
                            <input type="password" name="clave" placeholder="Contraseña" className="input" value={formRegistro.clave} onChange={cambioRegistro}/>
                            <button type="submit" className="botonR">Registrarse</button>
                        </div>
                    </form>
                </div>
            </div>
            {!estadoSesion ? (
                <div className="container-formdos">
                    <div className="mensajes">
                        <p className="msj-error">{mensajeError}</p>
                        <p className="msj-exito">{mensajeExito}</p>
                    </div>
                </div>
            ) : (
                <div className="container-fordos">
                    <div className="mensajes">
                        <p className="msj-error">{mensajeError}</p>
                        <p className="msj-exito">{mensajeExito}</p>
                    </div>
                    <div className="info-usuario-logeado">
                        <p className="p-info-usuario-logeado">{mensajeInfo.mensaje + " " + mensajeInfo.nombreUsuario}</p>
                    </div>
                    <div className="containerboton-userlogeado">
                        <button className="btninfo" onClick={infouser}>Visualizar información</button>
                        <button className="btncerrar" onClick={closesession}>Cerrar Sesión</button>
                    </div>
                </div>
            )}
        </div>
    )
}