const contactos = [
    {
        id: 1,
        nombre: "Silvina",
        apellido: "González",
        telefono: 3815751796,
    },
    {
        id: 2,
        nombre: "Carlos",
        apellido: "Juárez",
        telefono: 3813321221,
    },
    {
        id: 3,
        nombre: "Facundo",
        apellido: "Leguizamón",
        telefono: 3816825451,
    },
    {
        id: 4,
        nombre: "Juan",
        apellido: "Soraire",
        telefono: 3815521221,
    },
    {
        id: 5,
        nombre: "Diego",
        apellido: "Zuleta",
        telefono: 3815264451,
    },
    {
        id: 6,
        nombre: "Osvaldo",
        apellido: "Pérez",
        telefono: 3816811151,
    },
    {
        id: 7,
        nombre: "Elena",
        apellido: "Díaz",
        telefono: 3815333266,
    },
    {
        id: 8,
        nombre: "Juan P.",
        apellido: "López",
        telefono: 3811234576,
    },
];

const Contacto = ({ nombre, apellido, telefono }) => (
    <div className="contacto">
        <h1>{nombre} {apellido}</h1>
        <p>Teléfono: {telefono}</p>
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

