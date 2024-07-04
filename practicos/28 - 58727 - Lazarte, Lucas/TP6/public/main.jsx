const { useState } = React;

function App() {
    const [sesionIniciada, setSesionIniciada] = useState(false);
    const [aviso, setAviso] = useState('');

    const registar = async (event) => {
        event.preventDefault();
        const username = document.getElementById('useRegistro').value.trim();
        const password = document.getElementById('useContraseña').value.trim();
        const rePassword = document.getElementById('useReContraseña').value.trim();

        if (!username || !password || !rePassword) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, rePassword })
        });
        const data = await response.json();
        setAviso(data.message);
    };

    const inicio = async (event) => {
        event.preventDefault();
        const username = document.getElementById('nombreinicio').value.trim();
        const password = document.getElementById('contraseñainicio').value.trim();

        if (!username || !password) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        setAviso(data.message);
        if (response.status === 200) {
            setSesionIniciada(true);
        }
    };

    const cerrrarsesion = async (event) => {
        event.preventDefault();
        const response = await fetch('/logout', {
            method: 'POST'
        });
        const data = await response.json();
        setAviso(data.message);
        if (response.status === 200) {
            setSesionIniciada(false);
        }
    };

    const verinfo = async (event) => {
        event.preventDefault();
        const response = await fetch('/info');
        const data = await response.json();
        setAviso(data.message);
    };

    return (
        <>
            <div><h1>TP6 - Sesiones</h1></div>
            <form>
                <h2>Registro</h2>
                <input type="text" id="useRegistro" placeholder="Usuario" />
                <input type="password" id="useContraseña" placeholder="Contraseña" />
                <input type="password" id="useReContraseña" placeholder="Repita Contraseña" />
                <button onClick={registar}>Registrar</button>
            </form>
            <form>
                <h2>Login</h2>
                <input type="text" id="nombreinicio" placeholder="Usuario" />
                <input type="password" id="contraseñainicio" placeholder="Contraseña" />
                <button onClick={inicio}>Inicio de Sesión</button>
            </form>
            {sesionIniciada && (
                <>
                    <form>
                        <h2>Cerrar Sesión</h2>
                        <button onClick={cerrrarsesion}>Cerrar</button>
                    </form>
                    <form>
                        <h2>Información</h2>
                        <button onClick={verinfo}>Ver Información</button>
                    </form>
                </>
            )}
            <p>{aviso}</p>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
