const { useState, useEffect } = React;

function Aplicacion() {
    const [datosRegistro, setDatosRegistro] = useState({ usuario: '', contrasena: '' });
    const [datosLogin, setDatosLogin] = useState({ usuario: '', contrasena: '' });
    const [mensajeAlerta, setMensajeAlerta] = useState('');
    const [informacionUsuario, setInformacionUsuario] = useState({});
    const [usuarioLogueado, setUsuarioLogueado] = useState(false);
    const [mostrarLogin, setMostrarLogin] = useState(false);
    const [mostrarRegistro, setMostrarRegistro] = useState(false);

    const cambioRegistro = (e) => {
        const { name, value } = e.target;
        setDatosRegistro(datos => ({ ...datos, [name]: value }));
    };

    const cambioLogin = (e) => {
        const { name, value } = e.target;
        setDatosLogin(datos => ({ ...datos, [name]: value }));
    };

    const enviarRegistro = async (e) => {
        e.preventDefault();
        const response = await fetch('/registrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: datosRegistro.usuario, password: datosRegistro.contrasena })
        });
        const result = await response.text();
        setMensajeAlerta(result);
        if (response.ok) {
            setDatosRegistro({ usuario: '', contrasena: '' });
            setMostrarRegistro(false);
        }
    };

    const enviarLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: datosLogin.usuario, password: datosLogin.contrasena })
        });
        const result = await response.text();
        if (response.ok) {
            setUsuarioLogueado(true);
            obtenerInformacion();
            setDatosLogin({ usuario: '', contrasena: '' });
            setMostrarLogin(false);
        }
        setMensajeAlerta(result);
    };

    const enviarLogout = async () => {
        const response = await fetch('/logout', { method: 'PUT' });
        const result = await response.text();
        if (response.ok) {
            setUsuarioLogueado(false);
            setInformacionUsuario({});
        }
        setMensajeAlerta(result);
    };

    const obtenerInformacion = async () => {
        const response = await fetch('/info');
        const data = await response.json();
        if (response.ok) {
            setInformacionUsuario(data);
        } else {
            setMensajeAlerta(data);
        }
    };

    useEffect(() => {
        if (usuarioLogueado) {
            obtenerInformacion();
        }
    }, [usuarioLogueado]);

    const mostrarFormularioRegistro = () => {
        setMostrarRegistro(true);
        setMostrarLogin(false);
    };

    const mostrarFormularioLogin = () => {
        setMostrarLogin(true);
        setMostrarRegistro(false);
    };

    return (
        <div className="container">
            <h1>Sesiones</h1>
            {!usuarioLogueado ? (
                <div>
                    <div className="botonesinicio">
                        <button onClick={mostrarFormularioRegistro}>Registrarse</button>
                        <button onClick={mostrarFormularioLogin}>Iniciar Sesión</button>
                    </div>

                    {mostrarRegistro && (
                        <form onSubmit={enviarRegistro}>
                            <h2>Registrarse</h2>
                            <label>
                                Usuario:
                                <input type="text" name="usuario" value={datosRegistro.usuario} onChange={cambioRegistro} required />
                            </label>
                            <br />
                            <label>
                                Contraseña:
                                <input type="password" name="contrasena" value={datosRegistro.contrasena} onChange={cambioRegistro} required />
                            </label>
                            <br />
                            <button type="submit">Registrarse</button>
                        </form>
                    )}

                    {mostrarLogin && (
                        <form onSubmit={enviarLogin}>
                            <h2>Iniciar Sesión</h2>
                            <label>
                                Usuario:
                                <input type="text" name="usuario" value={datosLogin.usuario} onChange={cambioLogin} required />
                            </label>
                            <br />
                            <label>
                                Contraseña:
                                <input type="password" name="contrasena" value={datosLogin.contrasena} onChange={cambioLogin} required />
                            </label>
                            <br />
                            <button type="submit">Iniciar Sesión</button>
                        </form>
                    )}
                </div>
            ) : (
                <div>
                    <button className="logout-btn" onClick={enviarLogout}>Cerrar Sesión</button>
                    <div>
                        <h2 id="infouser">Info del Usuario:</h2>
                        <p id="info">- Usuario: {informacionUsuario.user}</p>
                        <p id="info">- Contraseña: {informacionUsuario.password}</p>
                    </div>
                </div>
            )}
            <br />
            {mensajeAlerta && <p>{mensajeAlerta}</p>}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Aplicacion />);
