const { useState, useEffect } = React;

function App() {
    const [page, setPage] = useState('signin')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        fetch('/info')
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('No autorizado')
                }
            })
            .then(data => {
                setUsername(data.message.split(' ')[1])
                setIsLoggedIn(true)
            })
            .catch(() => {
                setIsLoggedIn(false)
            })
    }, [])

    const handleSignIn = async (e) => {
        e.preventDefault()
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        const data = await response.json()
        if (response.ok) {
            setUsername(username)
            setIsLoggedIn(true)
            setError('')
        } else {
            setError(data.error)
        }
        setPassword('')
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        const data = await response.json()
        if (response.ok) {
            setPage('signin')
            setError('')
        } else {
            setError(data.error)
        }
        setPassword('')
    }

    const handleLogout = async () => {
        await fetch('/logout', { method: 'POST' })
        setIsLoggedIn(false)
        setPage('signin')
        setUsername('')
    }

    return (
        <div className="container">
            {isLoggedIn ? (
                <div className="info">
                    <h1>BIENVENIDO</h1>
                    <h1>{username}</h1>
                    <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
                </div>
            ) : (
                <div className="form-container">
                    {page === 'signin' && (
                        <form onSubmit={handleSignIn}>
                            <h1>Iniciar sesión</h1>
                            <input
                                type="text"
                                placeholder="Usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Iniciar sesión</button>
                            <p onClick={() => setPage('signup')} className="switch-link">Registrarse</p>
                            {error && <p className="error">{error}</p>}
                        </form>
                    )}
                    {page === 'signup' && (
                        <form onSubmit={handleSignUp}>
                            <h1>Registrarse</h1>
                            <input
                                type="text"
                                placeholder="Usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Registrarse</button>
                            <p onClick={() => setPage('signin')} className="switch-link">Iniciar sesión</p>
                            {error && <p className="error">{error}</p>}
                        </form>
                    )}
                </div>
            )}
        </div>
    )
}
