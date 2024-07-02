const { useState, useEffect } = React;

function App() {
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [fone, setFone] = useState(null);
	const [regis, setRegis] = useState(false);
	const [log, setLog] = useState(false);
	const [more, setMore] = useState(false);
	const [token, setToken] = useState(0);

	const mostrar = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('/mostrarDatos');
			const data = await response.json();
			console.log(data);
		} catch (error) {
			alert('Error: ' + error.message);
		}
	};

	const register = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user, password, fone, email }),
			});
			const data = await response.json();
			if (data.me === 'User registered successfully') {
				alert(data.me);
				setRegis(false);
			}
		} catch (error) {
			alert('Error: ' + error.message);
		}
	};

	const login = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('/login', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user, password }),
			});
			const data = await response.json();
			if (data.me === 'User logged in') {
				alert(data.me);
				setLog(true);
			}
		} catch (error) {
			alert('Error: ' + error.message);
		}
	};

	const logout = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('/logout', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user, password }),
			});
			const data = await response.json();
			if (data.me === 'User logged out') {
				alert(data.me);
				setLog(false);
			}
		} catch (error) {
			alert('Error: ' + error.message);
		}
	};

	const validation = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('/validation');
			const data = await response.json();
			console.log(data.me);
			setEmail(data.email);
			setPassword(data.password);
			setUser(data.user);
			setFone(data.fone);
			setToken(data.token);
			if (data.me === 'ok') {
				setLog(false);
				setMore(true);
			} else {
				setLog(false);
				setMore(false);
				setRegis(false);
				alert('timeout, log in again');
			}
		} catch (error) {
			alert('Error: ' + error.message);
		}
	};

	return (
		<div className='container mt-5'>
			<h1 className='text-center mb-4'>TP6 - Sesiones</h1>

			{!regis && !log && !more && (
				<div className='card p-4 mb-4' style={{ margin: '30px' }}>
					<form onSubmit={login}>
						<div className='mb-3'>
							<label htmlFor='user' className='form-label'>
								User Name
							</label>
							<input
								type='text'
								className='form-control'
								id='user'
								placeholder='User'
								onChange={(e) => setUser(e.target.value)}
								required
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='password' className='form-label'>
								Password
							</label>
							<input
								type='password'
								className='form-control'
								id='password'
								placeholder='Password'
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className='d-flex justify-content-between'>
							<button type='button' className='btn btn-secondary' onClick={() => setRegis(true)}>
								Register
							</button>
							<button type='submit' className='btn btn-primary'>
								Login
							</button>
						</div>
					</form>
				</div>
			)}

			{regis && (
				<div className='card p-4 mt-4' style={{ margin: '30px' }}>
					<form onSubmit={register}>
						<div className='mb-3'>
							<label htmlFor='username' className='form-label'>
								Username
							</label>
							<input type='text' className='form-control' id='username' onChange={(e) => setUser(e.target.value)} required />
						</div>
						<div className='mb-3'>
							<label htmlFor='reg-password' className='form-label'>
								Password
							</label>
							<input
								type='password'
								className='form-control'
								id='reg-password'
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='email' className='form-label'>
								Email
							</label>
							<input type='email' className='form-control' id='email' onChange={(e) => setEmail(e.target.value)} required />
						</div>
						<div className='mb-3'>
							<label htmlFor='fone' className='form-label'>
								Fone
							</label>
							<input type='number' className='form-control' id='fone' onChange={(e) => setFone(e.target.value)} required />
						</div>
						<div className='d-flex justify-content-between'>
							<button type='submit' className='btn btn-primary'>
								Register
							</button>
							<button type='button' className='btn btn-secondary' onClick={() => setRegis(false)}>
								Cancelar
							</button>
						</div>
					</form>
				</div>
			)}

			{more && (
				<div className='card p-4 mt-4' style={{ margin: '30px' }}>
					<h2>User: {user}</h2>
					<h2>Password: {password}</h2>
					<h2>Email: {email}</h2>
					<h2>Fone: {fone}</h2>
					<h2>Token: {token}</h2>
					<div className='d-flex justify-content-between mt-3'>
						<button
							className='btn btn-primary'
							onClick={(e) => {
								logout(e);
								setMore(false);
							}}
						>
							Logout
						</button>
						<button
							className='btn btn-secondary'
							onClick={() => {
								setMore(false);
								setLog(true);
							}}
						>
							Volver
						</button>
					</div>
				</div>
			)}

			{log && (
				<div className='card p-4 mt-4' style={{ margin: '30px' }}>
					<div className='d-flex justify-content-between'>
						<button className='btn btn-info' onClick={validation}>
							More
						</button>
						<button className='btn btn-danger' onClick={logout}>
							Logout
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
