let contactos = [
    { id: 1, nombre: "Gabriela", apellido: "Gutiérrez", telefono: 3811112233 },
    { id: 2, nombre: "Eduardo", apellido: "López", telefono: 3812223344 },
    { id: 3, nombre: "Marina", apellido: "Hernández", telefono: 3813334455 },
    { id: 4, nombre: "Rodrigo", apellido: "Martínez", telefono: 3814445566 },
    { id: 5, nombre: "Valeria", apellido: "Pérez", telefono: 3815556677 },
    { id: 6, nombre: "Javier", apellido: "García", telefono: 3816667788 },
    { id: 7, nombre: "Camila", apellido: "Rodríguez", telefono: 3817778899 },
    { id: 8, nombre: "Fernando", apellido: "Sánchez", telefono: 3818889900 },
    { id: 9, nombre: "Luciana", apellido: "Díaz", telefono: 3819990011 },
    { id: 10, nombre: "Sebastián", apellido: "Vega", telefono: 3810001122 },
    { id: 11, nombre: "Carolina", apellido: "Gómez", telefono: 3811112233 },
    { id: 12, nombre: "Alejandro", apellido: "Fernández", telefono: 3812223344 }
];
const Contacto = ({ nombre, apellido, telefono }) => (
    <div className="contacto-card">
        <h1>{nombre} {apellido}</h1>
        <p>Teléfono: {telefono}</p>
    </div>
);

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

const App = () => (
    <div>
        <Agenda />
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));



