function App() {
    const [mensaje, setMensaje] = React.useState('');
    const [token, setToken] = React.useState('');
    const [isRegistering, setIsRegistering] = React.useState(false);
    const [isLoggingIn, setIsLoggingIn] = React.useState(false);
    const [usuario, setUsuario] = React.useState('');
    const [clave, setClave] = React.useState('');

    async function usuarios() {
        try {
            let res = await fetch('/usuarios');
            if (!res.ok) throw new Error('Error fetching users');
            let data = await res.json();
            console.log(data);
            setMensaje(JSON.stringify(data, null, 2));
        } catch (error) {
            setMensaje(error.message);
        }
    }

    async function handleRegistrar(e) {
        e.preventDefault();
        try {
            let res = await fetch('/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: usuario, password: clave })
            });
            let data = await res.text();
            setMensaje(data);
            if (res.ok) {
                setUsuario('');
                setClave('');
                setIsRegistering(false);
            }
        } catch (error) {
            setMensaje(error.message);
        }
    }

    async function handleLogin(e) {
        e.preventDefault();
        try {
            let res = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: usuario, password: clave }),
            });
            let data = await res.text();
            setMensaje(data);
            if (res.ok) {
                let token = res.headers.get('token');
                setToken(token); 
                document.cookie = `token=${token}; path=/`; 
                setUsuario('');
                setClave('');
                setIsLoggingIn(false);
            }
        } catch (error) {
            setMensaje(error.message);
        }
    }

    async function logout() {
        try {
            let res = await fetch('/logout', {
                method: 'PUT',
                credentials: 'include',
            });
            let data = await res.text();
            setMensaje(data);
            if (res.ok) {
                setToken('');
                document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'; 
            }
        } catch (error) {
            setMensaje(error.message);
        }
    }

    async function info() {
        try {
            let res = await fetch('/info', {
                method: 'GET',
                credentials: 'include',
            });
            if (res.ok) {
                let data = await res.text();
                setMensaje(data);
                console.log("Autenticación exitosa, redireccionando...");
                
            } else {
                setMensaje('Acceso no autorizado');
                console.log("Acceso no autorizado");
            }
        } catch (error) {
            setMensaje(error.message);
            console.log("Error en la solicitud:", error.message);
        }
    }

    return (
        <div>
            <h1>Inicio de sesión</h1>
            <ul>
                <li>
                    <button onClick={() => setIsRegistering(!isRegistering)}>
                        Registrar
                    </button>
                </li>
                <li>
                    <button onClick={() => setIsLoggingIn(!isLoggingIn)}>
                        Login
                    </button>
                </li>
                <li>
                    <button onClick={logout}>Logout</button>
                </li>
                <li>
                    <button onClick={info}>Info</button>
                </li>
            </ul>
            {isRegistering && (
                <form onSubmit={handleRegistrar}>
                    <h2>Registrar</h2>
                    <label>
                        Usuario:
                        <input
                            type="text"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                    </label>
                    <label>
                        Contraseña:
                        <input
                            type="password"
                            value={clave}
                            onChange={(e) => setClave(e.target.value)}
                        />
                    </label>
                    <button type="submit">Registrar</button>
                </form>
            )}
            {isLoggingIn && (
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <label>
                        Usuario:
                        <input
                            type="text"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                    </label>
                    <label>
                        Contraseña:
                        <input
                            type="password"
                            value={clave}
                            onChange={(e) => setClave(e.target.value)}
                        />
                    </label>
                    <button type="submit">Login</button>
                </form>
            )}
            <pre>{mensaje}</pre>
            <p>{token}</p>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
