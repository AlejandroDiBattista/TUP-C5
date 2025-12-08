const { useState } = React;

function App() {
    const [formularioActual, setFormularioActual] = useState('login');
    const [estaLogueado, setEstaLogueado] = useState(false);
    const [informacion, setInformacion] = useState(null);

    const manejarRegistro = () => {
        setFormularioActual('registro');
    };

    const manejarRegistroUsuario = async (e) => {
        e.preventDefault();
        const usuario = e.target.nuevoUsuario.value;
        const contrasena = e.target.nuevaContrasena.value;
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: usuario, password: contrasena }),
        });
        const data = await response.json();
        alert(data.message || data.error);
        if (response.ok) {
            setFormularioActual('login');
        }
    };

    const manejarLogin = async (e) => {
        e.preventDefault();
        const usuario = e.target.usuario.value;
        const contrasena = e.target.contrasena.value;
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: usuario, password: contrasena }),
        });
        const data = await response.json();
        if (response.ok) {
            setEstaLogueado(true);
        }
        alert(data.message || data.error);
    };

    const manejarLogout = async () => {
        const response = await fetch('/api/logout', {
            method: 'POST',
        });
        const data = await response.json();
        setEstaLogueado(false);
        setInformacion(null);
        alert(data.message);
    };

    const obtenerInformacion = async () => {
        const response = await fetch('/api/info');
        const data = await response.json();
        if (response.ok) {
            setInformacion(data);
        } else {
            alert(data.error);
        }
    };

    return (
        <div>
            <h1>TP6 - Sesiones</h1>
            {estaLogueado ? (
                <div className="info">
                    <h2>Bienvenido</h2>
                    <button onClick={obtenerInformacion}>Ver Info</button>
                    {informacion && (
                        <div>
                            <p>Usuario: {informacion.username}</p>
                            <p>Contraseña: {informacion.password}</p>
                        </div>
                    )}
                    <button onClick={manejarLogout}>Cerrar Sesión</button>
                </div>
            ) : (
                <div>
                    {formularioActual === 'login' && (
                        <div>
                            <h2>Iniciar Sesión</h2>
                            <form onSubmit={manejarLogin}>
                                <label>
                                    Usuario:
                                    <input type="text" name="usuario" id="usuario" />
                                </label>
                                <br />
                                <label>
                                    Contraseña:
                                    <input type="password" name="contrasena" id="contrasena" />
                                </label>
                                <br />
                                <button type="submit">Iniciar Sesión</button>
                                <button type="button" onClick={manejarRegistro}>Registrar</button>
                            </form>
                        </div>
                    )}
                    {formularioActual === 'registro' && (
                        <div>
                            <h2>Registrar Nuevo Usuario</h2>
                            <form onSubmit={manejarRegistroUsuario}>
                                <label>
                                    Usuario:
                                    <input type="text" name="nuevoUsuario" id="nuevoUsuario" />
                                </label>
                                <br />
                                <label>
                                    Contraseña:
                                    <input type="password" name="nuevaContrasena" id="nuevaContrasena" />
                                </label>
                                <br />
                                <button type="submit">Registrar</button>
                                <button type="button" onClick={() => setFormularioActual('login')}>Volver al Login</button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
