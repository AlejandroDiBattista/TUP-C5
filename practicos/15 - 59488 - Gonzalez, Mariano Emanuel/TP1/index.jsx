const App = () => (
    <div>
        <h1>¡Hola, a todos!</h1>
        <p>Esta es mi primera agenda de contactos</p>
        <Agenda />
    </div>
)

const ListaDeContactos = [
    { id: 0, nombre: 'Mariano', apellido: 'Gonzalez', telefono: '3815866682' },
    { id: 1, nombre: 'Lucía', apellido: 'Pérez', telefono: '3876543210' },
    { id: 2, nombre: 'Carlos', apellido: 'López', telefono: '3498765432' },
    { id: 3, nombre: 'Valentina', apellido: 'Martínez', telefono: '3623456789' },
    { id: 4, nombre: 'Andrés', apellido: 'Fernández', telefono: '3812345678' },
    { id: 5, nombre: 'Camila', apellido: 'Rodríguez', telefono: '3876543210' },
    { id: 6, nombre: 'Gabriel', apellido: 'Ramírez', telefono: '3498765432' },
    { id: 7, nombre: 'Sofía', apellido: 'Gómez', telefono: '3623456789' },
    { id: 8, nombre: 'Mateo', apellido: 'Torres', telefono: '3812345678' },
    { id: 9, nombre: 'Isabella', apellido: 'Hernández', telefono: '3876543210' },
    { id: 10, nombre: 'Alejandro', apellido: 'Gutiérrez', telefono: '3498765432' },
    { id: 11, nombre: 'Valeria', apellido: 'Sánchez', telefono: '3623456789' },
    { id: 12, nombre: 'Joaquín', apellido: 'Díaz', telefono: '3812345678' },
    { id: 13, nombre: 'Emma', apellido: 'Romero', telefono: '3876543210' },
    { id: 14, nombre: 'Julián', apellido: 'Navarro', telefono: '3498765432' },
    { id: 15, nombre: 'Martina', apellido: 'Mendoza', telefono: '3623456789' },
    { id: 16, nombre: 'Leonardo', apellido: 'Paz', telefono: '3812345678' },
    { id: 17, nombre: 'Florencia', apellido: 'Silva', telefono: '3876543210' },
    { id: 18, nombre: 'Sebastián', apellido: 'Rojas', telefono: '3498765432' },
    { id: 19, nombre: 'Isabel', apellido: 'Vargas', telefono: '3623456789' },
    { id: 20, nombre: 'Nicolás', apellido: 'Acosta', telefono: '3812345678' }
]

const Contacto = ({ nombre, apellido, telefono }) => (
    <div className="TarjetaPresentacion">
        <p>{nombre} {apellido}</p>
        <p>Nro de telefono: {telefono}</p>
    </div>
);

const Agenda = () => (
    <div>
        <div>
            {ListaDeContactos.map(contacto => (
                <Contacto
                    key={contacto.id}
                    nombre={contacto.nombre}
                    apellido={contacto.apellido}
                    telefono={contacto.telefono}
                />
            ))}
        </div>
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'))