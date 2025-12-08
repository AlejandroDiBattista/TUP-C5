const contactos = [
    { id: 1, nombre: "Agustin", apellido: "Flores", telefono: "3814756603" },
    { id: 2, nombre: "Tomas", apellido: "Gonzalez", telefono: "3814756601" },
    { id: 3, nombre: "Melanie", apellido: "Paz", telefono: "3814756602" },
    { id: 4, nombre: "Celeste", apellido: "Flores", telefono: "3814756604" },
    { id: 5, nombre: "Aylen", apellido: "Gonzalez", telefono: "3814756605" },
    { id: 6, nombre: "Lucas", apellido: "Flores", telefono: "3814756606" }
];

const App = () => (
    <div className="contac">
        <h1>Agenda de Contacto (TP1)</h1>
        {contactos.map(contacto => (
            <Contacto
                key={contacto.id}
                id={contacto.id}
                apellido={contacto.apellido}
                nombre={contacto.nombre}
                telefono={contacto.telefono}
            />
        ))}
    </div>
);

const Contacto = ({ id, nombre, apellido, telefono }) => (
    <div className="Tarjeta">
        <h3>{apellido} {nombre}</h3>
        <p><span className="id">id:</span> {id}</p>
        <p><span>Telefono:</span> {telefono}</p>
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));