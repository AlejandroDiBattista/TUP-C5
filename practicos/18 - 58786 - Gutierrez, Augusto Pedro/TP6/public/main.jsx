const { useState, useEffect } = React;
const { Toastify } = window;

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [view, setView] = useState('home'); // Estado para manejar la vista actual

    useEffect(() => {
        fetch('/api/auth/check')
            .then(response => response.json())
            .then(data => setIsAuthenticated(data.isAuthenticated))
            .catch(error => console.error('Error al verificar autenticación:', error));
    }, []);

    const logout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
            });
            if (response.ok) {
                setIsAuthenticated(false);
                setView('home');
            } else {
                console.error('Error al cerrar sesión');
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div>
            <h1>TP6 - Sesiones</h1>
            {view === 'home' && <Home isAuthenticated={isAuthenticated} setView={setView} logout={logout} />}
            {view === 'register' && <Register setView={setView} />}
            {view === 'login' && <Login setIsAuthenticated={setIsAuthenticated} setView={setView} />}
            {view === 'info' && <Info isAuthenticated={isAuthenticated} />}
        </div>
    );
}

function Home({ isAuthenticated, setView, logout }) {
    return (
        <div>
            <h2>Bienvenido</h2>
            <div>
                <button onClick={() => setView('register')}>Registrar</button>
                <button onClick={() => setView('login')}>Iniciar Sesión</button>
                <button onClick={() => setView('info')}>Información</button>
                {isAuthenticated && <button onClick={logout}>Cerrar Sesión</button>}
            </div>
        </div>
    );
}

function Register({ setView }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            if (!response.ok) {
                throw new Error('Error al registrar usuario');
            }
            Toastify({ text: 'Usuario registrado exitosamente', duration: 3000, backgroundColor: 'green' }).showToast();
            setView('login');
        } catch (error) {
            Toastify({ text: `Error: ${error.message}`, duration: 3000, backgroundColor: 'red' }).showToast();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Registro</h3>
            <label>
                Usuario
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Contraseña
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit">Registrar</button>
            <button type="button" onClick={() => setView('home')}>Cancelar</button>
        </form>
    );
}

function Login({ setIsAuthenticated, setView }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }
            const data = await response.json();
            setIsAuthenticated(true);
            Toastify({ text: 'Inicio de sesión exitoso', duration: 3000, backgroundColor: 'green' }).showToast();
            setView('home');
        } catch (error) {
            Toastify({ text: `Error: ${error.message}`, duration: 3000, backgroundColor: 'red' }).showToast();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Iniciar Sesión</h3>
            <label>
                Usuario
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Contraseña
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit">Iniciar Sesión</button>
            <button type="button" onClick={() => setView('home')}>Cancelar</button>
        </form>
    );
}

function Info({ isAuthenticated }) {
    if (!isAuthenticated) {
        return <p>No está autorizado para ver esta información.</p>;
    }
    return <p>Información confidencial para usuarios autenticados.</p>;
}

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
