const listaContactos = [
    {id: 1, nombre: "Martin", apellido: "Salsa", telefono: "312412"},
    {id: 2, nombre: "Pedro", apellido: "Martin", telefono: "24234"},
    {id: 3, nombre: "Tito", apellido: "Pereira", telefono: "345645"},
    {id: 4, nombre: "Teresa", apellido: "Lopez", telefono: "546456"},
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