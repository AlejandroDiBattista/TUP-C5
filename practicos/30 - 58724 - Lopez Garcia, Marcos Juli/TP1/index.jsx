const listaContactos = [
    {id: 1, nombre: "Julian", apellido: "Lopez", telefono: "555-010-2021"},
    {id: 2, nombre: "Lucas", apellido: "Garcia", telefono: "555-010-2022"},
    {id: 3, nombre: "Marta", apellido: "Ruiz", telefono: "555-010-2023"},
    {id: 4, nombre: "Juan", apellido: "Torres", telefono: "555-010-2024"},
    {id: 5, nombre: "Elena", apellido: "Lopez", telefono: "555-010-2025"},
    {id: 6, nombre: "Carlos", apellido: "Gomez", telefono: "555-010-2026"},
    {id: 7, nombre: "Laura", apellido: "Jimena", telefono: "555-010-2027"},
    {id: 8, nombre: "Sergio", apellido: "Moreno", telefono: "555-010-2028"},
    {id: 9, nombre: "Ana", apellido: "Navarro", telefono: "555-010-2029"},
    {id: 10, nombre: "David", apellido: "Romero", telefono: "555-010-2030"},
]

const Contactos = ({nombre, apellido, telefono}) => (
    <div className="contactodehtml">
        <h1>{nombre} {apellido}</h1>
        <p>Celular: {telefono} </p>
    </div>
)

const Agenda = () => (
    <div className="agendacontactos">
        {
            listaContactos.map(Contacto => <Contactos
                key={Contacto.id}
                nombre={Contacto.nombre}
                apellido={Contacto.apellido}
                telefono={Contacto.telefono}
            />)
        }
    </div>
)

const App = () =>  (
    <div>
        <h1 className="h1-tittle">Lista de contactos</h1>
        <Agenda />
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))