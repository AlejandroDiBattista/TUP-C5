const ListaCompleta = [
	{ id: 1, nombre: 'Facundo', apellido: 'Frias', telefono: '4371234' },
	{ id: 2, nombre: 'Agustin', apellido: 'Fernandez', telefono: '4375678' },
	{ id: 3, nombre: 'Mauricio', apellido: 'Bustos', telefono: '4379012' },
	{ id: 4, nombre: 'Manuel', apellido: 'Lasaña', telefono: '4373456' },
	{ id: 5, nombre: 'Lucas', apellido: 'Hindi', telefono: '4377890' },
	{ id: 6, nombre: 'Lucia', apellido: 'Fernandez', telefono: '4372345' },
	{ id: 7, nombre: 'Ricardo', apellido: 'Sanchez', telefono: '4376789' },
	{ id: 8, nombre: 'Beatriz', apellido: 'Rodriguez', telefono: '4370123' },
	{ id: 9, nombre: 'Hector', apellido: 'Ramirez', telefono: '4374567' },
	{ id: 10, nombre: 'Patricia', apellido: 'Torres', telefono: '4378901' },
];

const Contacto = ({ nombre, apellido, telefono }) => (
	<div>
		<h3>Nombre: {nombre}</h3>
		<p>Apellido: {apellido}</p>
		<p>Teléfono: {telefono}</p>
	</div>
);

const renderContactos = () =>
	ListaCompleta.map(({ id, nombre, apellido, telefono }) => (
		<Contacto key={id} nombre={nombre} apellido={apellido} telefono={telefono} />
	));

const Agenda = () => <div>{renderContactos()}</div>;

const App = () => (
	<div>
		<h1>¡Hola!</h1>
		<Agenda />
		<p>Primer Tp de React</p>
	</div>
);

ReactDOM.render(<App />, document.getElementById('root'));
