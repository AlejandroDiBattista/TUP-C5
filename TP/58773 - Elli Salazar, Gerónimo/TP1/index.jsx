const contactos = [
    { id: 1, nombre: "Lionel", apellido: "Messi", telefono: "3814235867" },

    { id: 2, nombre: "Jude", apellido: "Bellingham", telefono: "3814568713" },
    { id: 3, nombre: "Martin", apellido: "Palermo", telefono: "3811234678" },
    { id: 4, nombre: "Cristiano", apellido: "Ronaldo", telefono: "3814756713" },
    { id: 5, nombre: "Paulo", apellido: "Dybala", telefono: "38147512456" },
    { id: 6, nombre: "Ruben", apellido: "Doblas", telefono: "3818324567" }
];

const App = () => (
    <div className="contac">
        <h1> La Agenda de Contactos TP1</h1>
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