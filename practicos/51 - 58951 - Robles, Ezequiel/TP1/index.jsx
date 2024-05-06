const ListaCompleta = [
    { id: 1, nombre: "Franco", apellido: "Armani", telefono: "123456" },
    { id: 2, nombre: "Marcelo", apellido: "Herrera", telefono: "789101" },
    { id: 3, nombre: "Leandro", apellido: "Pirez", telefono: "54564" },
    { id: 4, nombre: "Paulo", apellido: "Diaz", telefono: "752755" },
    { id: 5, nombre: "Enzo", apellido: "Diaz", telefono: "52752" },
    { id: 6, nombre: "Rodrigo", apellido: "Aliendro", telefono: "72771" },
    { id: 7, nombre: "Rodrigo", apellido: "Villagra", telefono: "74125" },
    { id: 7, nombre: "Claudio", apellido: "Echeverri", telefono: "63952" },
    { id: 7, nombre: "Nacho", apellido: "Fernandez", telefono: "471528" },
    { id: 7, nombre: "Facundo", apellido: "Colidio", telefono: "154724" },
    { id: 7, nombre: "Miguel", apellido: "Borja", telefono: "417412" },
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

ReactDOM.render(<App />, document.getElementById('root'))