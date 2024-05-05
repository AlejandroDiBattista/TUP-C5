const ListaCompleta = [
    { id: 1, nombre: "Fermin", apellido: "Barros", telefono: "3816xxxxxx" },
    { id: 2, nombre: "Nicolas", apellido: "Alvarez", telefono: "3816xxxxxx" },
    { id: 3, nombre: "Ricardo", apellido: "Lopez", telefono: "3813xxxxxx" },
    { id: 4, nombre: "Carlos", apellido: "Albornoz", telefono: "3816xxxxxx" },
    { id: 5, nombre: "Micaela", apellido: "Nuñez", telefono: "3813xxxxxx" },
    { id: 6, nombre: "Nicole", apellido: "Salinaz", telefono: "2235xxxxxx" },
    { id: 7, nombre: "Carla", apellido: "Cordoba", telefono: "3816xxxxxx" },
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