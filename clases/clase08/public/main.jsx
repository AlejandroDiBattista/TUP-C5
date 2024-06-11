function App() {
	let [mensaje, setMensaje] = React.useState('');
    let [token, setToken] = React.useState('');

	function mostrar(texto) {
		alert(texto);
	}

	async function usuarios() {
		let res = await fetch('/usuarios');
		let data = await res.json();
		console.log(data);
		setMensaje(JSON.stringify(data, null, 2));
    }
    
    async function registrar() {
        let res = await fetch('/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    user: 'adibattista',
                    password: '1234'
                }
            )
        })
        let data = await res.text();
        setMensaje(data);
    }
    
    async function login() {
         let res = await fetch('/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user: 'adibattista',
					password: '1234',
				}),
         });
         
        // let token = res.headers.get('token');
        // setToken(token);
        let data = await res.text();
        setMensaje(data);
    } 
        
    async function logout() { 
        let res = await fetch('/logout', {
			method: 'PUT',
			credentials: 'include', // Aquí es donde incluyes las cookies
		});
        let data = await res.text();
        setMensaje(data);
        // setToken('');
    }

    async function info() { 
             let res = await fetch('/info', {
					method: 'GET',
					credentials: 'include', // Aquí es donde incluyes las cookies
				});
        let data = await res.text();
        setMensaje(data);
    }
    
    return (
		<div>
			<h1>Probar Session</h1>
<ul>
<li>
<button onClick={usuarios}>Usuarios</button>
</li>
<li>
<button onClick={registrar}>
    Registrar
</button>
</li>
<li>
<button onClick={login}>Login</button>
</li>
<li>
<button onClick={logout}>Logout</button>
</li>
<li>
<button onClick={info}>Info</button>
</li>
</ul>
            <pre>{mensaje}</pre>
            <p>token: {token}</p>
		</div>
	);
}
