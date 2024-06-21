


function App() {
    const [logueado, setLogueado] = useState(false);
    const [Usuario, setUsuario] = useState({});
    return logueado ? <InfoLogueado usuario={Usuario} setLogueado={setLogueado} /> : <RegistroUsuario setNombreUsuario={setUsuario} setLogueado={setLogueado} />
}

function InfoLogueado({ setLogueado, usuario }) {
    const [mostrarPerfil, setMostrarPerfil] = useState(false);
    const handleLogout = async () => {
        const res = await fetch('http://localhost:3000/logout', {
            method: 'put',
            credentials: 'include'
        });
        if (res.status == 200) {
            setLogueado(false);
            window.notyf.success("Deslogueado");
        }
    }
    const handlePerfil = () => {
        setMostrarPerfil(true)
    }
    const HandleHome=()=>{
        setMostrarPerfil(false)
    }
    return (
        <>
            <nav>
                <ul>
                    <li className="ListaNom"><strong className="nombreBien">Bienvenido - </strong><p className="nombreusuario">{usuario.nombreusuario}</p></li>
                </ul>
                <div><h2 className="Home" onClick={HandleHome}>Home</h2></div>              
                <ul>                
                    <li>
                        <details className="dropdown">
                            <summary>Account</summary>
                            <ul dir="rtl">
                                <li><a onClick={handlePerfil}>Profile</a></li>
                                <li><a onClick={handleLogout}>Logout</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </nav>
            {!mostrarPerfil && <h1 className="TituloPar">SEGUNDO PARCIAL UTN TUP</h1>}
            {mostrarPerfil && (
                <div className="table-container">
                    <table>
                        <tbody>
                            <tr>
                                <th>Nombre</th>
                                <td>{usuario.nombreusuario}</td>
                            </tr>
                            <tr>
                                <th>Correo</th>
                                <td>{usuario.correo}</td>
                            </tr>
                            <tr>
                                <th>Contraseña</th>
                                <td>{usuario.contrasena}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

function RegistroUsuario({ setLogueado, setNombreUsuario }) {
    useEffect(() => {
        const notyf = new Notyf({
            duration: 3000,
            position: {
                x: 'right',
                y: 'top',
            }
        });
        window.notyf = notyf;
    }, []);

    const [registrando, setRegistrando] = useState(true);
    const [correo, setCorreo] = useState(null);
    const [clave, setClave] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [mensaje, setMensaje] = useState(null)

    const handletRegister = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/registrar', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    nombreusuario: usuario,
                    correo: correo,
                    contrasena: clave
                })
        });
        const data = await res.text();
        if (res.status === 200) {
            setRegistrando(false);
            window.notyf.success(data);
        } else {
            window.notyf.error(data);
        }
    }

    const handletLogin = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    correo: correo,
                    contrasena: clave
                })
        });
        const data = await res.json();
        if (res.status === 200) {
            setLogueado(true);
            setNombreUsuario(data.Usuario);
            window.notyf.success(data.message);
        } else {
            window.notyf.error(data.message);
        }
    }

    return registrando ? (
        <div>
            <div className="container-form register">
                <div className="information">
                    <div className="info-childs">
                        <h2>Bienvenido</h2>
                        <p>Por favor Inicia Sesión con tus datos</p>
                        <input type="button" value="Iniciar Sesión" id="sign-in" onClick={() => { setRegistrando(false); setClave(null); setCorreo(null); setUsuario(null) }} />
                    </div>
                </div>
                <div className="form-information">
                    <div className="form-information-childs">
                        <h2>Crear una Cuenta</h2>
                        <form className="form form-register" onSubmit={handletRegister}>
                            <div>
                                <label>
                                    <i className='bx bx-user' ></i>
                                    <input type="text" placeholder="Nombre Usuario" name="userName" required onChange={(e) => setUsuario(e.target.value)} />
                                </label>
                            </div>
                            <div>
                                <label >
                                    <i className='bx bx-envelope' ></i>
                                    <input type="email" placeholder="Correo Electronico" name="userEmail" required onChange={(e) => setCorreo(e.target.value)} />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <i className='bx bx-lock-alt' ></i>
                                    <input type="password" placeholder="Contraseña" name="userPassword" required onChange={(e) => setClave(e.target.value)} />
                                </label>
                            </div>

                            <input type="submit" value="Registrarse" />
                            <div className="alerta-error">Todos los campos son obligatorios</div>
                            <div className="alerta-exito">Te registraste correctamente</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ) :
        (
            <>
                <div className="container-form login hide">
                    <div className="information">
                        <div className="info-childs">
                            <h2>¡¡Bienvenido nuevamente!!</h2>
                            <p>Por favor Inicia Sesión con tus datos</p>
                            <input type="button" value="Registrarse" id="sign-up" onClick={() => { setRegistrando(true); setClave(null); setCorreo(null); setUsuario(null) }} />
                        </div>
                    </div>
                    <div className="form-information">
                        <div className="form-information-childs">
                            <h2>Iniciar Sesión</h2>
                            <form className="form form-login" onSubmit={handletLogin} >
                                <div>
                                    <label >
                                        <i className='bx bx-envelope' ></i>
                                        <input type="email" placeholder="Correo Electronico" name="userPassword" required onChange={(e) => setCorreo(e.target.value)} />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <i className='bx bx-lock-alt' ></i>
                                        <input type="password" placeholder="Contraseña" name="userPassword" required onChange={(e) => setClave(e.target.value)} />
                                    </label>
                                </div>
                                <input type="submit" value="Iniciar Sesión" />
                                <div className="alerta-error">Todos los campos son obligatorios</div>
                                <div className="alerta-exito">Te registraste correctamente</div>
                            </form>
                        </div>
                    </div>
                </div>

            </>
        )
}