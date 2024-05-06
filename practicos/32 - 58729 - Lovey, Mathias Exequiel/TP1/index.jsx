const contactos = [
    {
        id: 1,
        nombre: "Mathias",
        apellido: "Lovey",
        telefono: 3813402923,
    },
    {
        id: 2,
        nombre: "Daniela",
        apellido: "Lovey",
        telefono: 3813402924,
    },
    {
        id: 3,
        nombre: "Valentina",
        apellido: "Lovey",
        telefono: 3813402925,
    },
    {
        id: 4,
        nombre: "Lucas",
        apellido: "Martinez",
        telefono: 3813402926,
    },
    {
        id: 5,
        nombre: "Lionel",
        apellido: "Messi",
        telefono: 3813402927,
    },
    {
        id: 6,
        nombre: "Tato",
        apellido: "Aguilera",
        telefono: 3813402928,
    },
    {
        id: 7,
        nombre: "Martina",
        apellido: "Quesada",
        telefono: 3813402929,
    },
    {
        id: 8,
        nombre: "Jose",
        apellido: "Mamberto",
        telefono: 3813402930,
    },
    {
        id: 9,
        nombre: "Esteban",
        apellido: "Zapata",
        telefono: 3813402931,
    },
    {
        id: 10,
        nombre: "Don Juan",
        apellido: "Gomez",
        telefono: 3813402932,
    },
]
const Contacto =({nombre, apellido, telefono}) => (
    <div className="contacto">
        <h1>{nombre} {apellido}</h1>
        <p>Teléfono: {telefono} </p>
    </div>
)
const Agenda = () =>(
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
const App = () =>  (
    <div>
        <Agenda />
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))