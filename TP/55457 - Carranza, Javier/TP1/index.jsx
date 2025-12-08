const contactos = [
    { id: 1, nombre: "Leonardo", apellido: "DiCaprio", telefono: "(381)4235867" },
    { id: 2, nombre: "Taylor", apellido: "Swift", telefono: "(381)4568713" },
    { id: 3, nombre: "Robert", apellido: "Downey Jr.", telefono: "(381)1234678" },
    { id: 4, nombre: "Scarlett", apellido: "Johansson", telefono: "(381)4756713" },
    { id: 5, nombre: "Chris", apellido: "Hemsworth", telefono: "(381)47512456" },
    { id: 6, nombre: "Emma", apellido: "Watson", telefono: "(381)8324567" }
];

const App = () => (
    <div className="contac">
        <h1> Agenda de Contactos</h1>
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
)

ReactDOM.render(<App />, document.getElementById('root'))
