const listaContactos = [
    {id: 1, nombre: "facundo", apellido: "gomez", telefono: "3816600679"},
    {id: 2, nombre: "fauto", apellido: "lopez", telefono: "38147894"},
    {id: 3, nombre: "nahuel", apellido: "diaz", telefono: "38176648"},
    {id: 4, nombre: "matias", apellido: "asick", telefono: "38136889"},
    {id: 5, nombre: "lucas", apellido: "gonzlez", telefono: "381324687"},
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
        <Agenda />
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))