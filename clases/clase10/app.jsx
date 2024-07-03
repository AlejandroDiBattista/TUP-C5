import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; 

function Home() {
	return <h2>Home</h2>;
}

function About() {
	return <h2>About</h2>;
}

function App() {
	return (
		<BrowserRouter>
			<div>
				<nav>
					<ul>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='/about'>About</Link>
						</li>
					</ul>
				</nav>

				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/about' element={<About />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;