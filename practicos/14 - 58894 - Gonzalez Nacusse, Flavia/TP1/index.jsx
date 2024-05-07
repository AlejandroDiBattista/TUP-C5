let Contacto = [
    { id: 1, nombre: "Flavia", apellido: "Nacusse", telefono: "3815512657"},
    { id: 2, nombre: "Florencia", apellido: "López", telefono: "3815556865"},
    { id: 3, nombre: "María", apellido: "González", telefono: "3815662888"},
    { id: 4, nombre: "Lucia", apellido: "Diaz", telefono: "3819654250"},
    { id: 5, nombre: "Lucas", apellido: "Jimenez", telefono: "3819635789"},
    { id: 6, nombre: "Alberto", apellido: "Sanchez", telefono: "3815572063"},
    { id: 7, nombre: "Mauro", apellido: "Perez", telefono: "3818920404"},
    { id: 8, nombre: "Juan", apellido: "Gomez", telefono: "3814721500"},
    { id: 9, nombre: "Facundo", apellido: "Hernandez", telefono: "3816314920"},
    { id: 10, nombre: "Camila", apellido: "Lopez", telefono: "3816058459"},
    ]
function Contactos({ contacto }) {
    return (
        <div className="Contacto">
            <h3>{contacto.nombre} {contacto.apellido}</h3>
            <p>Teléfono: {contacto.telefono}</p>
        </div>
    );
}

const App = () => (
    <div>
        <h1>Agenda</h1>
        {Contacto.map(contacto => <Contactos key={contacto.id} contacto={contacto} />)}
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'))