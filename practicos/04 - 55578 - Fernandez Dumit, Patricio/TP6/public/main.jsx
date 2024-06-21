function App() {
    const [registro, setRegistro] = useState({ user: '', password: '' });
    const [logIn, setLogIn] = useState({ user: '', password: '' });
    const [sesion, setSesion] = useState(false);
    const [msjExito, setMsjExito] = useState('');
    const [msjError, setMsjError] = useState('');
    const [msjInformacion, setMsjInformacion] = useState({ mensaje: '', usuario: '' });

    const handleRegistro = (e) => {
        const { name, value } = e.target;
        setRegistro({ ...registro, [name]: value });
        console.log(name, value);
    };

    const handleLogIn = (e) => {
        const { name, value } = e.target;
        setLogIn({ ...logIn, [name]: value });
        console.log(name, value);
    };

    const registrar = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registro)
            });
            const data = await response.json();
            console.log(data);
            if (data.ok) {
                setMsjExito(data.mensaje);
                setMsjError('');
                setRegistro({ ...registro, user: '', password: '' });
            } else {
                setMsjError(data.mensaje);
                setMsjExito('');
                setRegistro({ ...registro, user: '', password: '' });
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    const iniciarSesion = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/login', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(logIn)
            });
            const data = await response.json();
            console.log(data);
            if (data.ok) {
                setSesion(true);
                setMsjExito(data.mensaje);
                setMsjError('');
                setLogIn({ ...logIn, user: '', password: '' });
            } else {
                setMsjError(data.mensaje);
                setMsjExito('');
                setLogIn({ ...logIn, user: '', password: '' });
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    const verInformacion = async () => {
        try {
            const response = await fetch('/info', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            console.log(data);
            if (data.ok) {
                const nuevaInformacion = { mensaje: data.mensaje, usuario: data.usuario };
                setMsjInformacion(nuevaInformacion);
            } else {
                setMsjError(data.mensaje);
                setMsjExito('');
            }
        } catch (error) {
            console.error('Error al obtener información del usuario:', error);
        }
    };

    const logOut = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            console.log(data);
            if (data.ok) {
                setSesion(false);
                setMsjExito(data.mensaje);
                setMsjError('');
            } else {
                setMsjError(data.mensaje);
                setMsjExito('');
            }
        } catch (error) {
            console.error('Error al cerrar sesión', error);
        }

    };

    return (
        <div className="contenedor">
            <h1>Gestión de sesiones</h1>
            <div className="contenedor-forms">
                <div>
                    <div className="form-registro">
                        <h2>Registro de cuenta</h2>
                        <form className="form" onSubmit={registrar}>
                            <input
                                type="text"
                                name="user"
                                placeholder="Nombre de usuario"
                                className="input"
                                value={registro.user}
                                onChange={handleRegistro}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                className="input"
                                value={registro.password}
                                onChange={handleRegistro}
                            />
                            <button type="submit" className="btn-registro">Registrar</button>
                        </form>
                    </div>

                    <div className="form-login">
                        <h2 className="h2-form">Iniciar Sesión en la cuenta</h2>
                        <form className="form" onSubmit={iniciarSesion}>
                            <input
                                type="text"
                                name="user"
                                placeholder="Nombre de usuario"
                                className="input"
                                value={logIn.user}
                                onChange={handleLogIn}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                className="input"
                                value={logIn.password}
                                onChange={handleLogIn}
                            />
                            <button type="submit" className="btn-login">Iniciar Sesión</button>
                        </form>
                    </div>
                </div>
                
                {!sesion ? (<div>
                    <div className="msjs">
                        <p className="error">{msjError}</p>
                        <p className="exito">{msjExito}</p>
                    </div>

                    <div>
                        <p className="info-usuario">Inicia sesión con tu cuenta para ver información confidencial</p>
                    </div>

                </div>)
                    :
                    (<div>
                        <div className="msjs">
                            <p className="error">{msjError}</p>
                            <p className="exito">{msjExito}</p>
                        </div>

                        <div>
                            <p className="info-usuario">{msjInformacion.mensaje + " " + msjInformacion.usuario}</p>
                        </div>
                        
                        <div>
                            <button className="btn-verinfo" onClick={verInformacion}>Ver información</button>
                            <button className="btn-logout" onClick={logOut}>Cerrar Sesión</button>
                        </div>

                    </div>)}
            </div>
        </div>
    )
}