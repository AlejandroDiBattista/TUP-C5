let contactos = [
    {id: 1, nombre: 'Juan', apellido: "Perez", telefono: '4444'},
    {id: 2, nombre: 'Maria', apellido: "Gomez", telefono: '3333'},
    {id: 3, nombre: 'Pedro', apellido: "Garcia", telefono: '2222'},
    {id: 4, nombre: 'Ana', apellido: "Fernandez", telefono: '1111'},
    {id: 5, nombre: 'Lucia', apellido: "Rodriguez", telefono: '5555'},
    {id: 6, nombre: 'Carlos', apellido: "Lopez", telefono: '6666' },
    {id: 7, nombre: 'Luis', apellido: "Martinez", telefono: '7777'}
]

const Titulo = ({texto}) => <h3>{texto}</h3>

const Contacto = ({nombre, apellido, telefono}) => (
    <div>
        <h3>{nombre} {apellido}</h3>
        <p>Telefono: {telefono}</p>
    </div>
)
const Probar = (props) => {
    console.log(props)
    return (
    <div>
        <h3>Prueba</h3>
        <p>Prueba</p>
    </div>
    )
}

const Agenda = () => (
    <div>
        {contactos.map(contacto => (
            <Contacto key={contacto.id} nombre={contacto.nombre} apellido={contacto.apellido} telefono={contacto.telefono} />
        ))}
    </div>
)

const App = () =>  (
    <div>
        <Probar texto="Prueba" b="B"/>
        <Titulo texto= "Agenda" />
        <Agenda />
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))