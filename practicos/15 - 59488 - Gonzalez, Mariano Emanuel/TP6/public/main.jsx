function App() {
    const [mensaje, setMensaje] = React.useState('');
    const [usuarioRegistro, setUsuarioRegistro] = React.useState('');
    const [contrasenaRegistro, setContrasenaRegistro] = React.useState('');
    const [usuarioLogin, setUsuarioLogin] = React.useState('');
    const [contrasenaLogin, setContrasenaLogin] = React.useState('');
    const [mostrarRegistro, setMostrarRegistro] = React.useState(false);
    const [mostrarLogin, setMostrarLogin] = React.useState(false);

    async function registrar(e) {
        e.preventDefault();
        let res = await fetch('/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: usuarioRegistro, password: contrasenaRegistro }),
        });
        let data = await res.text();
        setMensaje(data);
        if (res.ok) {
            setUsuarioRegistro('');
            setContrasenaRegistro('');
            setMostrarRegistro(false);
        }
    }

    async function iniciarSesion(e) {
        e.preventDefault();
        let res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: usuarioLogin, password: contrasenaLogin }),
        });
        let data = await res.text();
        setMensaje(data);
        if (res.ok) {
            setMostrarLogin(false);
        }
    }

    async function cerrarSesion() {
        let res = await fetch('/logout', {
            method: 'PUT',
            credentials: 'include',
        });
        let data = await res.text();
        setMensaje(data);
        setUsuarioLogin('');
        setContrasenaLogin('');
    }

    async function obtenerInfo() {
        let res = await fetch('/info', {
            method: 'GET',
            credentials: 'include',
        });
        let data = await res.text();
        setMensaje(data);
    }

    function toggleRegistro() {
        setMostrarRegistro(!mostrarRegistro);
        if (!mostrarRegistro) {
            setMostrarLogin(false);
        }
    }

    function toggleLogin() {
        if(usuarioLogin) setMensaje('Ya hay una sesión activa.');
        else{

        
             setMostrarLogin(!mostrarLogin);
            if (!mostrarLogin) {
             setMostrarRegistro(false);
            }
        }
    }

    return (
        <div>
            <h1>Inicio de Sesión</h1>
            <button onClick={toggleRegistro}>Registrarse</button>
            <button onClick={toggleLogin}>Iniciar sesion</button>
            <button onClick={cerrarSesion}>Cerrar sesion</button>
            <button onClick={obtenerInfo}>Info</button>

            {mostrarRegistro && (
                <form onSubmit={registrar} autoComplete="off">
                    <h2>Registrarse</h2>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={usuarioRegistro}
                        onChange={(e) => setUsuarioRegistro(e.target.value)}
                        autoComplete="new-username"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={contrasenaRegistro}
                        onChange={(e) => setContrasenaRegistro(e.target.value)}
                        autoComplete="new-password"
                    />
                    <button type="submit">Registrarse</button>
                </form>
            )}

            {mostrarLogin && (
                <form onSubmit={iniciarSesion} autoComplete="off">
                    <h2>Iniciar sesion</h2>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={usuarioLogin}
                        onChange={(e) => setUsuarioLogin(e.target.value)}
                        autoComplete="username"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={contrasenaLogin}
                        onChange={(e) => setContrasenaLogin(e.target.value)}
                        autoComplete="current-password"
                    />
                    <button type="submit">Ingresar</button>
                </form>
            )}
            <h1>{mensaje}</h1>
        </div>
    );
}
