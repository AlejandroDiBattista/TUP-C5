let contactos = [
    { id: 1, nombre: 'Emiliano', apellido: 'Stemberger', telefono: '(381) 317-6546' },
    { id: 2, nombre: 'Shaquille', apellido: "O'neal", telefono: '(381) 900-8765' },
    { id: 3, nombre: 'Lionel', apellido: 'Messi', telefono: '(381) 121-9099' },
    { id: 4, nombre: 'Cristiano', apellido: 'Ronaldo', telefono: '(381) 667-5543' },
    { id: 5, nombre: 'Emanuel', apellido: 'Ginobili', telefono: '(381) 011-9862' },
    { id: 6, nombre: 'Michael', apellido: 'Jordan', telefono: '(381) 675-7789' },
    { id: 7, nombre: 'Diego', apellido: 'Maradona', telefono: '(381) 675-7781' },
    { id: 8, nombre: 'Rodrigo', apellido: 'De Paul', telefono: '(381) 675-7782' },
    { id: 9, nombre: 'Marco', apellido: 'De Tropoya', telefono: '(381) 675-7783' },
    { id: 10, nombre: 'José María', apellido: 'Listorti', telefono: '(381) 675-7784' },
    { id: 11, nombre: 'Alex', apellido: 'Caniggia', telefono: '(381) 675-7785' },
    { id: 12, nombre: 'Alfredo', apellido: 'Di Stefano', telefono: '(381) 675-7786' },
    { id: 13, nombre: 'Geronimo', apellido: 'Benavides', telefono: '(381) 675-7787' },
    { id: 14, nombre: 'Vladimir', apellido: 'Putin', telefono: '(381) 675-7788' },
    { id: 15, nombre: 'Ete', apellido: 'Sech', telefono: '(381) 675-7780' },
    { id: 16, nombre: 'Phil', apellido: 'Collins', telefono: '(381) 675-7701' },
    { id: 17, nombre: 'Cassius', apellido: 'Clay', telefono: '(381) 675-7702' },
    { id: 18, nombre: 'David', apellido: 'Beckham', telefono: '(381) 675-7703' }
]

const Contacto = ({ id, nombre, apellido, telefono }) =>
    <div>
        <ul>
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