const contactos = [
    { id: 1, nombre: "Micaela", apellido: "Medina", telefono: "3816948587", },
    { id: 2, nombre: "Valeria", apellido: "Toledo", telefono: "3812084003", },
    { id: 3, nombre: "Sandra", apellido: "Lopez", telefono: "3814183027", },
    { id: 4, nombre: "Silvina", apellido: "Gonzalez", telefono: "3815751796", }
];

const Contacto = ({ nombre, apellido, telefono }) => (
    <div className="contacto">
        <h1>{nombre} {apellido}</h1>
        <p>Telefono: {telefono}</p>
    </div>
)

const Agenda = () => (
    <div className="agenda">
        {
            contactos.map(contacto => <Contacto key={contacto.id}
                nombre={contacto.nombre}
                apellido={contacto.apellido}
                telefono={contacto.telefono}
            />)
        }
    </div>
)

const App = () => (
    <div>
        <Agenda />
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))