const contactos = [
    { id: 1, nombre: "David", apellido: "Cronenberg", telefono: "16102797600" },
    { id: 2, nombre: "John", apellido: "Carpenter", telefono: "16103347690" },
    { id: 3, nombre: "George A.", apellido: "Romero", telefono: "16106741401" },
    { id: 4, nombre: "Wes", apellido: "Craven", telefono: "16163347391" },
    { id: 5, nombre: "H.R.", apellido: "Giger", telefono: "16102337591" },
    { id: 7, nombre: "Sam", apellido: "Raimi", telefono: "16102347789" },
    { id: 8, nombre: "Guillermo", apellido: "Del Toro", telefono: "16102347661" },
    { id: 9, nombre: "Peter", apellido: "Jackson", telefono: "16106344691" },
];

const App = () => (
    <div className="contenedor">
        <h1>Contactos</h1>
        {contactos.map(contacto => (
            <Contacto
                key={contacto.id}
                id={contacto.id}
                apellido={contacto.apellido}
                nombre={contacto.nombre}
                telefono={contacto.telefono}
            />
        ))}
    </div>
);

const Contacto = ({ id, nombre, apellido, telefono }) => (
    <div className="ID">
        <h3>{nombre} {apellido}</h3>
        <p><span className="id">ID:</span> {id}</p>
        <p><span className="cel">Telefono:</span> {telefono}</p>
    </div>
)
ReactDOM.render(<App />, document.getElementById('root'))

