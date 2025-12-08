function App() {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [enseñarInfo, setEnseñarInfo] = useState(false);
    const [modo, setModo] = useState('login');
    const [logueado, setLogueado] = useState(false);


    useEffect(() => {
        const valorCookie = getCookie('usuario');

        if (valorCookie) {
            setLogueado(true);
            setUsuario(valorCookie);
        }
    }, []);

    const getCookie = (nombre) => {
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === nombre) {
                return cookieValue;
            }
        }
        return null;
    };

    const Registro = async (e) => {
        e.preventDefault();
        if (usuario === "" || contraseña === "") {
            setMensaje('Complete todos los campos');
            return;
        } else {
            const response = await fetch('http://localhost:3000/registro', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ usuario, contraseña })
            });

            const data = await response.json();
            setMensaje(data.message);
            setUsuario('');
            setContraseña('');
        }
    };

    const InicioSesion = async (e) => {
        e.preventDefault();
        if (usuario === "" || contraseña === "") {
            setMensaje('Complete todos los campos');
            return;
        }

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ usuario, contraseña }),
        });

        const data = await response.json();

        if (response.ok) {
            setMensaje('Usuario logueado correctamente');
            setLogueado(true);
            setModo('logueado');
        } else {
            setMensaje(data.error || 'Usuario o contraseña incorrectas');
        }
    };

    const CerrarSesion = async () => {

        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });

        const data = await response.json();

        if (response.ok) {
            setMensaje('Usuario deslogueado correctamente');
            setLogueado(false);
            setModo('login');
            setUsuario('');
            setContraseña('');
            setEnseñarInfo(false);
        } else {
            setMensaje(data.error || 'Error al cerrar sesion');
        }

    };

    const cambiarModo = (modoCambiado) => {
        setModo(modoCambiado);
        setMensaje('');
        setUsuario('');
        setContraseña('');
    };

    const VerInfo = async () => {
        const response = await fetch('http://localhost:3000/info')
        setEnseñarInfo(!enseñarInfo);
    };

    return (<div>
        <div>
            <h2>{modo === 'login' ? 'Login de Usuario' : 'Registro de Usuario'}</h2>
            {!logueado ? (
                <form onSubmit={modo === 'login' ? InicioSesion : Registro}>
                    <div>
                        <label>Usuario:</label>
                        <input
                            type="text"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                        />
                    </div>
                    <button type="submit">{modo === 'login' ? 'Iniciar Sesión' : 'Registrarse'}</button>
                </form>
            ) : (
                <>
                    <button onClick={CerrarSesion}>Cerrar Sesión</button>
                    <button onClick={VerInfo}>Ver Info</button>
                </>
            )}
            {!logueado && (
                <>
                    {modo === 'login' ? (
                        <button onClick={() => cambiarModo('registrar')}>Registrarse</button>
                    ) : (
                        <button onClick={() => cambiarModo('login')}>Iniciar Sesion</button>
                    )}
                </>
            )}
            {enseñarInfo && logueado && (
                <div>
                    <p>Usuario: {usuario}</p>
                    <p>Contraseña: {contraseña}</p>
                </div>
            )}
            <p>{mensaje}</p>
        </div>
    </div>
    );
}

export default App;