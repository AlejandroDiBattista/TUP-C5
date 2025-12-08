function App() {
    let [mensaje, setMensaje] = useState('');
    let [token, setToken] = useState('');
    let [logueado, setLogueado] = useState(false);
    let [user, setUser] = useState('');
    let [password, setPassword] = useState('');

    async function usuarios() {
        let res = await fetch('/usuarios');
        let data = await res.json();
        console.log(data);
        setMensaje(JSON.stringify(data, null, 2));
    }

    async function registrarUsuario(user, password) {
        let res = await fetch('/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, password })
        });
        let data = await res.text();
        setMensaje(data);
    }

    async function loginUsuario(user, password) {
        let res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, password }),
        });
        let data = await res.text();
        if (res.ok) {
            setToken(res.headers.get('token') || '');
            setLogueado(true);
        }
        setMensaje(data);
    }

    async function logout() {
        try {
            let res = await fetch('/logout', {
                method: 'PUT',
                credentials: 'include',
            });
            if (res.ok) {
                let data = await res.json();
                setMensaje(data.message);
                setToken('');
                setLogueado(false);
            } else {
                setMensaje('Error al intentar desloguear');
            }
        } catch (error) {
            console.error('Error en logout:', error);
            setMensaje('Error en logout');
        }
    }

    async function getInfo() {
        if (logueado) {
            try {
                let res = await fetch('/info', {
                    method: 'GET',
                    credentials: 'include',
                });
                window.location.href = 'https://www.google.com';
            } catch (error) {
                console.error('Error al obtener información:', error);
                setMensaje('Error al obtener información');
            }
        } else {
            setMensaje('Acceso no autorizado');
        }
    }

    function handleRegistrarSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = formData.get('user');
        const password = formData.get('password');
        e.preventDefault();
        e.stopPropagation()
        registrarUsuario(user, password);
    }

    function handleLoginSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = formData.get('user');
        const password = formData.get('password');
        e.preventDefault();
        e.stopPropagation()
        loginUsuario(user, password);
    }

    return (
        <div id="root">
            <h2>Gestión de Sesión</h2>
            <form onSubmit={handleRegistrarSubmit}>
                <h3>Registrar</h3>
                <input type="text" name="user" placeholder="Usuario" />
                <input type="password" name="password" placeholder="Contraseña" />
                <span><button type="submit">Registrar</button></span>
            </form>

            <form onSubmit={handleLoginSubmit}>
                <h3>Login</h3>
                <input type="text" name="user" placeholder="Usuario" />
                <input type="password" name="password" placeholder="Contraseña" />
                <span><button type="submit">Login</button></span>
            </form>
            <div>
                <button onClick={logout}>Logout</button>
                <button onClick={getInfo}>Info</button>
            </div>

            {token && <p>Token: {token}</p>}
            <section>
                <pre>{mensaje}</pre>
            </section>
        </div>
    );
}