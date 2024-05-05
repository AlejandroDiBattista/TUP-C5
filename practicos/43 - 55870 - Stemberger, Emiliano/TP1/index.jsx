let contactos = [
    { id: 1, nombre: 'Emiliano', apellido: 'Stemberger', telefono: '3813176546' },
    { id: 7, nombre: 'Shaquille', apellido: "O'neal", telefono: '3819008765' },
    { id: 13, nombre: 'Lionel', apellido: 'Messi', telefono: '3811219099' },
    { id: 2, nombre: 'Cristiano', apellido: 'Ronaldo', telefono: '3816675543' },
    { id: 8, nombre: 'Emanuel', apellido: 'Ginobili', telefono: '3810119862' },
    { id: 14, nombre: 'Michael', apellido: 'Jordan', telefono: '3816757789' },
    { id: 3, nombre: 'Diego', apellido: 'Maradona', telefono: '3816757781' },
    { id: 9, nombre: 'Rodrigo', apellido: 'De Paul', telefono: '3816757782' },
    { id: 15, nombre: 'El Bicho', apellido: 'Siuuuu', telefono: '3816757783' },
    { id: 4, nombre: 'José María', apellido: 'Listorti', telefono: '3816757784' },
    { id: 10, nombre: 'Alex', apellido: 'Caniggia', telefono: '3816757785' },
    { id: 16, nombre: 'Bad', apellido: 'Bunny', telefono: '3816757786' },
    { id: 5, nombre: 'Geronimo', apellido: 'Benavides', telefono: '3816757787' },
    { id: 11, nombre: 'Vladimir', apellido: 'Putin', telefono: '3816757788' },
    { id: 17, nombre: 'Ete', apellido: 'Sech', telefono: '3816757780' },
    { id: 6, nombre: 'Hiruzen', apellido: 'Sarutobi', telefono: '3816757701' },
    { id: 12, nombre: 'El', apellido: 'Pepe', telefono: '3816757702' },
    { id: 18, nombre: 'Davo', apellido: 'Xeneize', telefono: '3816757703' }
]

const Contacto = ({ id, nombre, apellido, telefono }) =>
    <div>
        <ul>
            <li>Id: {id}</li>
            <li>Nombre: {nombre}</li>
            <li>Apellido: {apellido}</li>
            <li>Teléfono: {telefono}</li>
        </ul>
    </div>

const App = () => (
    <div className="container">
        <h1>Agenda</h1>
        <div className="contacto">

            {contactos.map(contacto =>
                <div className="info">
                    <Contacto key={contacto.id}
                        id={contacto.id}
                        nombre={contacto.nombre}
                        apellido={contacto.apellido}
                        telefono={contacto.telefono}
                    />
                </div>
            )}

        </div>
    </div>
)



ReactDOM.render(<App />, document.getElementById('root'))