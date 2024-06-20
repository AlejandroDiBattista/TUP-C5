function App() {
    let [mensaje, setMensaje] = React.useState('');
    let [logeado, setLogeado] = React.useState(false);
    let [token, setToken] = React.useState('');
    let [user, setUser] = React.useState('');
    let [password, setPassword] = React.useState('');
    let [showForm, setShowForm] = React.useState('');

    async function registrar(e) {
        e.preventDefault();
        let res = await fetch('/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ user, password })
        });
        
        let data = await res.text();
        setMensaje(data);
        setUser('');
        setPassword('');
    }

    async function login(e) {
        e.preventDefault();
        let res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ user, password })
        });
        let data = await res.text();
        setMensaje(data);
        if (res.ok) {
            setLogeado(true);
            setToken(data.token);
        }
        setUser('');
        setPassword('');
    }

    async function logout() {
        if (logeado) {
            let res = await fetch('/logout', {
                method: 'PUT',
                credentials: 'include'
            });
            let data = await res.text();
            setMensaje(data);
            setLogeado(false);
        } else {
            alert("NO PUEDE CERRAR SESION SI NO SE LOGEO");
        }
    }

    async function info() {
        if (logeado) {
            window.location.href = "https://www.google.com/?hl=es";
        } else {
            setMensaje("Debe estar logueado para ver esta página.");
        }
    }

    return (
        <div>
            <h2>Gestión de sesiones</h2>
            <div className="button-group">
                <ul>
                    <li><button onClick={() => setShowForm('registrar')}>Registrar</button></li>
                    <li><button onClick={() => setShowForm('login')}>Login</button></li>
                    <li><button onClick={logout}>Logout</button></li>
                    <li><button onClick={info}>Info</button></li>
                </ul>
            </div>
            {showForm === 'registrar' && (
                <form onSubmit={registrar}>
                    <section>
                        <h3>Registrar</h3>
                        <label>
                            Usuario
                            <input
                                type="text"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Contraseña
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                    <span>
                        <button type="submit">Registrar</button> 
                    </span>
                    </section>
                    
                </form>
            )}
            {showForm === 'login' && (
                <form onSubmit={login}>
                    <section>
                        <h3>Login</h3>
                    <label>
                        Usuario
                        <input
                            type="text"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Contraseña
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <span>
                        <button type="submit">Login</button>
                    </span>
                    </section>
                    
                </form>
            )}
            <pre>{mensaje}</pre>
            <p>{logeado ? 'Usuario logueado' : 'No logueado'}</p>
        </div>
    );
}
