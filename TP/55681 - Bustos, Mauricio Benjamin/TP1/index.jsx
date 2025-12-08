// Lista de contactos
const contactos = [
    { id: 0, nombre: "Mauricio", apellido: "Bustos", telefono: "3814659905" },
    { id: 1, nombre: "Luz", apellido: "Moreno", telefono: "3814659906" },
    { id: 2, nombre: "Gaspar", apellido: "Salazar", telefono: "3814659907" },
    { id: 3, nombre: "Alejandro", apellido: "DiBattista", telefono: "3814659908" },
    { id: 4, nombre: "Pedro", apellido: "Perez", telefono: "3814659303" },
    { id: 5, nombre: "Gerardo", apellido: "Gonzalez", telefono: "3814453925" },
    { id: 6, nombre: "Juan", apellido: "Loretto", telefono: "3812654956" }
];

// Componente Contacto
const Contacto = ({ nombre, apellido, telefono }) => (
    <div className="contacto">
        <h1>{nombre} {apellido}</h1>
        <p>Teléfono: {telefono}</p>
    </div>
);

// Componente Agenda
const Agenda = () => (
    <div className="agenda">
        {
            contactos.map(contacto => (
                <Contacto
                    key={contacto.id}
                    nombre={contacto.nombre}
                    apellido={contacto.apellido}
                    telefono={contacto.telefono}
                />
            ))
        }
    </div>
);

// Componente principal App
const App = () => (
    <div className="nashi">
        <h1>Agenda de Contactos</h1>
        <Agenda />
    </div>
);

// Renderizar la aplicación en el elemento con id 'root'
ReactDOM.render(<App />, document.getElementById('root'));