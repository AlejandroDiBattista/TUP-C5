const Personas = [
    { id: 1, nombre: 'Martin', apellido: 'Dias', telefono: '123123' },
    { id: 2, nombre: 'Franco', apellido: 'Paredes', telefono: '123123' },
    { id: 3, nombre: 'Juan', apellido: 'Perez', telefono: '123123' },
    { id: 4, nombre: 'Pedro', apellido: 'Aguilera', telefono: '123123' },
    { id: 5, nombre: 'Maria', apellido: 'Condori', telefono: '123123' },
];

const Tarjeta = ({ nombre, apellido, telefono }) => (
    <div className="TarjetaDePresentacion">
        <ul>
            <li>Nombre: {nombre} </li>
            <li>Apellido: {apellido} </li>
            <li>Teléfono: {telefono} </li>
        </ul>

    </div>
);

const Agenda = () => (
    <div>
        {Personas.map((tarjeta) => (
            <Tarjeta
                id={tarjeta.id}
                nombre={tarjeta.nombre}
                apellido={tarjeta.apellido}
                telefono={tarjeta.telefono}
            />
        ))}
    </div>
);


const App = () => (
    <div>
        <h1>Agenda de contactos</h1>
        <Agenda />
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'))