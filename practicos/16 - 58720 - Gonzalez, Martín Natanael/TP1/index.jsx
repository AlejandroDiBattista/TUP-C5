const App = () => (

    <div>
        <h1>Esta es mi agenda!!</h1>
        <Agenda />
    </div>
)
let contactos = [
    { id: 1, nombre: "Martin", apellido: "Gonzalez", telefono: "3810000001" },
    { id: 2, nombre: "Martin", apellido: "Nuñez", telefono: "3810000002" },
    { id: 3, nombre: "Martin", apellido: "Lopez", telefono: "3810000003" },
    { id: 4, nombre: "Martin", apellido: "Lescano", telefono: "3810000004" },
    { id: 5, nombre: "Martin", apellido: "Lovey", telefono: "3810000005" },
    { id: 6, nombre: "Martin", apellido: "Garcia", telefono: "3810000006" }
]

const MostrarContactos = ({ id, nombre, apellido, telefono }) => (

    <div>
        <h3>{id}- {nombre} {apellido}</h3>
        <p>Telefono: {telefono}</p>
    </div>
)
const Agenda = () => (
    <div>
        {contactos.map((contacto) => (
            <MostrarContactos
                id={contacto.id}
                key={contacto.id}
                nombre={contacto.nombre}
                apellido={contacto.apellido}
                telefono={contacto.telefono}

            />
        ))}
    </div>
)
ReactDOM.render(<App />, document.getElementById('root'))