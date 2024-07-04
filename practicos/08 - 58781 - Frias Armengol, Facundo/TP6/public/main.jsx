
function App() {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [logueado, setLogueado] = useState(false);
    const [modo, setModo] = useState('login');

    useEffect(() => {
        const verificarSesion = async () => {
            const response = await fetch('/verificarSesion');
            if (response.ok) {
                const data = await response.json();
                setUsuario(data.usuario);
                setLogueado(true);
            }
        };
        verificarSesion();
    }, []);

    const manejarCambio = (setter) => (e) => setter(e.target.value);

    const manejarEnvio = async (e) => {
        e.preventDefault();
        const endpoint = modo === 'login' ? '/login' : '/registro';
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, contraseña }),
        });

        const data = await response.json();
        setMensaje(data.message);

        if (response.ok) {
            if (modo === 'login') {
                setLogueado(true);
            } else {
                setUsuario('');
                setContraseña('');
            }
        }
    };

    const cerrarSesion = async () => {
        const response = await fetch('/logout', { method: 'POST' });
        const data = await response.json();
        setMensaje(data.message);
        if (response.ok) {
            setLogueado(false);
            setUsuario('');
            setContraseña('');
        }
    };

    return (
        <div id="root">
            <h2>{modo === 'login' ? 'Login de Usuario' : 'Registro de Usuario'}</h2>
            {logueado ? (
                <div>
                    <button onClick={cerrarSesion}>Cerrar Sesión</button>
                </div>
            ) : (
                <form onSubmit={manejarEnvio}>
                    <div>
                        <label>Usuario:</label>
                        <input
                            type="text"
                            value={usuario}
                            onChange={manejarCambio(setUsuario)}
                        />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={contraseña}
                            onChange={manejarCambio(setContraseña)}
                        />
                    </div>
                    <button type="submit">
                        {modo === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                    </button>
                </form>
            )}
            {!logueado && (
                <button onClick={() => setModo(modo === 'login' ? 'registrar' : 'login')}>
                    {modo === 'login' ? 'Registrarse' : 'Iniciar Sesión'}
                </button>
            )}
            <p>{mensaje}</p>
        </div>
    );
}
