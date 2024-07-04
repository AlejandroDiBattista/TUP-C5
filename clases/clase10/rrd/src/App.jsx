import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './paginas/Home.jsx';
import About from './paginas/About.jsx';
import Contactos from './paginas/Contactos.jsx';

function App() {
	return (
		<BrowserRouter>
			<div>
				<nav>
					<ul>
						<li>
							<NavLink to='/'>Home</NavLink>
						</li>
						<li>
							<NavLink to='/about'>About</NavLink>
						</li>
						<li>
							<NavLink to='/contactos'>
								Informacion de contacto
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/contactos' element={<Contactos />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
