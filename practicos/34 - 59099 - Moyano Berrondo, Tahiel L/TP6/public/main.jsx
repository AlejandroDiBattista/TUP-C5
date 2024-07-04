function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [formMode, setFormMode] = useState('register');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [userId, setUserId] = useState(null); // Estado para almacenar el ID del usuario

    useEffect(() => {
        const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('sesionUsuario='));
        if (sessionCookie) {
            setIsLoggedIn(true);
            setUsername(sessionCookie.split('=')[1]);
            // Aquí podrías obtener el ID del usuario desde la sesión si lo manejas en el servidor
            // O podrías mantener una lista de usuarios y obtener el ID por el nombre de usuario
        }
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setAlertMessage('Completá todos los campos obligatorios');
            return;
        }

        const endpoint = formMode === 'register' ? 'registro' : 'acceso';
        try {
            const response = await fetch(`http://localhost:3000/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombreUsuario: username, contraseña: password }),
                credentials: 'include',
            });

            const data = await response.json();
            if (response.ok) {
                setAlertMessage(data.message);
                if (formMode === 'register') {
                    setUsername('');
                    setPassword('');
                } else {
                    setIsLoggedIn(true);
                    setFormMode('logged');
                    setUserId(data.user.id); // Almacena el ID del usuario en el estado
                }
            } else {
                setAlertMessage(data.error || 'Error en la solicitud');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setAlertMessage('Error en la solicitud. Inténtelo de nuevo más tarde.');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/salida', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                setAlertMessage('Se ha cerrado la sesión.');
                setIsLoggedIn(false);
                setFormMode('register');
                setUsername('');
                setPassword('');
                setShowDetails(false);
                setUserId(null); // Limpia el ID del usuario al cerrar sesión
            } else {
                setAlertMessage('Error al cerrar la sesión');
            }
        } catch (error) {
            console.error('Error de solicitud:', error);
            setAlertMessage('Errorr de solicitud. Inténte mas tarde.');
        }
    };

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const changeFormMode = (newMode) => {
        setFormMode(newMode);
        setAlertMessage('');
        setUsername('');
        setPassword('');
    };

    return (
        <div>
            <div className="container">
                <h2>{formMode === 'register' ? 'Registro' : 'Inicia Sesión'}</h2>
                {!isLoggedIn && (
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label>Nombre de usuario:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Contraseña:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <button type="submit">{formMode === 'register' ? 'Iniciar Sesion' : 'Registro'}</button>
                        </div>
                    </form>
                )}
                {isLoggedIn && (
                    <div className="button-container">
                        <button onClick={handleLogout} className="logout-button">Log-Out</button>
                        <button onClick={toggleDetails} className="menu-item">{showDetails ? 'Ocultar info' : 'Ver info'}</button>
                        {showDetails && (
                            <div className="details-container">
                                <p>Nombre de usuario {username}</p>
                                <p>ID del Usuario: {userId}</p> {/* Muestra el ID del usuario */}
                                <p>Contraseña: {password}</p>
                                <img src="https://i.pinimg.com/736x/ec/5b/40/ec5b40439fd4198758a7ec283b154f6c.jpg" alt="Documento" className="document-image" />
                            </div>
                        )}
                    </div>
                )}
                {!isLoggedIn && (
                    <button onClick={() => changeFormMode(formMode === 'register' ? 'login' : 'register')}>
                        {formMode === 'register' ? 'Log-In' : 'Form para Register'}
                    </button>
                )}
                <p>{alertMessage}</p>
            </div>
        </div>
    );
}

// export default App;
