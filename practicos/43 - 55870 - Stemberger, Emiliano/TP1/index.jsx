let contactos = [
    {id: 1, nombre: 'Emiliano', apellido: 'Stemberger', telefono: '1111'},
    {id: 2, nombre: 'Shaquille', apellido: "O'neal", telefono: '2222'},
    {id: 3, nombre: 'Lionel', apellido: 'Messi', telefono: '3333'},
    {id: 4, nombre: 'Cristiano', apellido: 'Ronaldo', telefono: '4444'},
    {id: 5, nombre: 'Emanuel', apellido: 'Ginobili', telefono: '5555'},
    {id: 6, nombre: 'Michael', apellido: 'Jordan', telefono: '6666'},
]

const Contacto = ({id, nombre, apellido, telefono}) =>
    <div>
        <p><b>Id:</b>{id}</p>
        <p><b>Nombre:</b>{nombre}</p>
        <p><b>Apellido:</b> {apellido}</p>
        <p><b>Teléfono:</b>{telefono}</p>
    </div>

const App = () =>  (
    <div className="contacto">
        <h1>Agenda</h1>
        {contactos.map(contacto =>
            <Contacto key = {contacto.id}
            id={contacto.id}
            nombre={contacto.nombre}
            apellido={contacto.apellido}
            telefono={contacto.telefono}        
            />
        )}
            
    </div>
)



ReactDOM.render(<App/> , document.getElementById('root'))