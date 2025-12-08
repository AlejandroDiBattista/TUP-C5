const AuthForm = ({ isLogin, onAuthSuccess, toggleForm }) => {
    const [formData, setFormData] = useState({ user: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? '/login' : '/registrar';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                if (isLogin) {
                    onAuthSuccess();
                    alert('Login exitoso');
                } else {
                    alert('Registro exitoso');
                    setFormData({ user: '', password: '' });
                    toggleForm(); //
                }
            } else {
                const message = await response.text();
                alert(`Error: ${message}`);
            }
        } catch (error) {
            alert('Error en la solicitud');
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Registro'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="user"
                    placeholder="Usuario"
                    value={formData.user}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</button>
            </form>
            <button onClick={toggleForm}>
                {isLogin ? 'Crear cuenta' : 'Ya tengo una cuenta'}
            </button>
        </div>
    );
};

const Info = () => {
    const [info, setInfo] = useState('');

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await fetch('/info');
                if (response.ok) {
                    const data = await response.text();
                    setInfo(data);
                } else {
                    setInfo('No autorizado');
                }
            } catch (error) {
                setInfo('Error al obtener la información');
            }
        };

        fetchInfo();
    }, []);

    return (
        <div>
            <h2>Información Sensible</h2>
            <p>{info}</p>
        </div>
    );
};

const LogoutButton = ({ onLogout }) => {
    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
            });

            if (response.ok) {
                onLogout();
                alert('Cierre de sesión exitoso');
            } else {
                alert('Error al cerrar sesión');
            }
        } catch (error) {
            alert('Error en la solicitud');
        }
    };

    return <button onClick={handleLogout}>Cerrar Sesión</button>;
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div>
            <h1></h1>
            {isAuthenticated ? (
                <>
                    <Info />
                    <LogoutButton onLogout={handleLogout} />
                </>
            ) : (
                <AuthForm isLogin={isLogin} onAuthSuccess={handleAuthSuccess} toggleForm={toggleForm} />
            )}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
