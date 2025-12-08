const { useState } = React;

const ContactCard = ({ contact }) => (
    <div className="contact-card">
        <h2>{contact.nombre} {contact.apellido}</h2>
        <p><strong>Teléfono:</strong> {contact.telefono}</p>
    </div>
);

const App = () => {
    const [contacts, setContacts] = useState([
        { id: 1, nombre: 'Agustina', apellido: 'Pérez', telefono: '3814520541' },
        { id: 2, nombre: 'Maria', apellido: 'Gómez', telefono: '3814578752' },
        { id: 4, nombre: 'Lucas', apellido: 'Martínez', telefono: '38154720145' },
        { id: 5, nombre: 'Jose', apellido: 'Castillo', telefono: '3815478714' },
        { id: 6, nombre: 'Luis', apellido: 'Castro', telefono: '3815024965' },
        { id: 7, nombre: 'Laura', apellido: 'Gonzalez', telefono: '3814250178' },
        { id: 8, nombre: 'Martin', apellido: 'Morales', telefono: '3816574879' },
        { id: 9, nombre: 'Elisa', apellido: 'Juarez', telefono: '3814257945' },
        { id: 10, nombre: 'Marcos', apellido: 'Diaz', telefono: '3815247145' },
        
    ]);

    return (
        <div>
            <h1>Agenda de Contactos</h1>
            {contacts.map(contact => (
                <ContactCard key={contact.id} contact={contact} />
            ))}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
