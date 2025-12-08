function App() {
    let [mensaje, setMensaje] = React.useState('');
    let [logueado, setlogueado] = React.useState(false);
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

    async function login(e) {  // Verificar
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
            setlogueado(true);
            setToken(data.token);
        }
        setUser('');
        setPassword('');
    }

    async function logout() {
        if (logueado) {
            let res = await fetch('/logout', {
                method: 'PUT',
                credentials: 'include'
            });
            let data = await res.text();
            setMensaje(data);
            setlogueado(false);
        } else {
            setMensaje("No puede usar este botón, ya que no está logueado");
        }
    }

    async function info() {
        if (logueado) {
            window.location.href = "https://www.frt.utn.edu.ar/";
        } else {
            setMensaje("No puede acceder a está info sin LOGUEARSE antes.");
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
            <p>{token}</p>
        </div>
    );
}
