const ListaCompleta = [
    { id: 1, nombre: "Gabriel", apellido: "Salazar", telefono: "3816xxxxxx" },
    { id: 2, nombre: "Ezequiel", apellido: "Robles", telefono: "3816xxxxxx" },
    { id: 3, nombre: "Gustavo", apellido: "Rodriguez", telefono: "3813xxxxxx" },
    { id: 4, nombre: "Belen", apellido: "Wierna", telefono: "3816xxxxxx" },
    { id: 5, nombre: "Sofia", apellido: "Jadur", telefono: "3813xxxxxx" },
    { id: 6, nombre: "Josefina", apellido: "Rosello", telefono: "2235xxxxxx" },
    { id: 7, nombre: "Lucas", apellido: "Ruiz", telefono: "3816xxxxxx" },
];

const Contacto = ({ nombre, apellido, telefono }) => (
    <div className="contacto-card">
        <h3>Nombre: {nombre}</h3>
        <p><b>Apellido:</b> {apellido}</p>
        <p><b>Teléfono:</b> {telefono}</p>
    </div>
);

const Agenda = () => (
    <div className="agenda">
        {ListaCompleta.map((contacto) => (
            <Contacto
                key={contacto.id}
                nombre={contacto.nombre}
                apellido={contacto.apellido}
                telefono={contacto.telefono}
            />
        ))}
    </div>
);

const App = () => {
    return (
        <div>
            <h1>¡Hola!</h1>
            <Agenda />
            <p><b>Primer TP de React</b></p>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
