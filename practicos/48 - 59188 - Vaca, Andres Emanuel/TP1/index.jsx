






let contactos = [
    { id:  1, nombre: "Gabriela", apellido: "Gutiérrez", telefono: 3811112233 },
    { id:  2, nombre: "Eduardo", apellido: "López", telefono: 3812223344 },
    { id:  3, nombre: "Marina", apellido: "Hernández", telefono: 3813334455 },
    { id:  4, nombre: "Rodrigo", apellido: "Martínez", telefono: 3814445566 },
    { id:  5, nombre: "Valeria", apellido: "Pérez", telefono: 3815556677 },
    { id:  6, nombre: "Javier", apellido: "García", telefono: 3816667788 },
    { id:  7, nombre: "Camila", apellido: "Rodríguez", telefono: 3817778899 },
    { id:  8, nombre: "Fernando", apellido: "Sánchez", telefono: 3818889900 },
    { id:  9, nombre: "Luciana", apellido: "Díaz", telefono: 3819990011 },
    { id: 10, nombre: "Sebastián", apellido: "Vega", telefono: 3810001122 },
    { id: 11, nombre: "Carolina", apellido: "Gómez", telefono: 3811112233 },
    { id: 12, nombre: "Alejandro", apellido: "Fernández", telefono: 3812223344 }
];
function App() {
    const [mostrarContactos, setMostrarContactos] = React.useState(false);
    const [tarjetaAmpliada, setTarjetaAmpliada] = React.useState(null);

    const handleClick = () => {
        setMostrarContactos(!mostrarContactos);
    };

    const handleTarjetaClick = (id) => {
        setTarjetaAmpliada(tarjetaAmpliada === id ? null : id);
    };

    return (
        <div>
            <h1 className="text-4xl text-center mb-4">Lista de Contactos</h1>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    {mostrarContactos ? 'Ocultar Lista de Contactos' : 'Mostrar Lista de Contactos'}
                </button>
            </div>
            <div className="contact-list">
                <div className="column">
                    {contactos.slice(0, 6).map(contacto => (
                        <div className={`contact-card ${mostrarContactos ? 'scale-100' : 'scale-0'} transition-transform duration-1000 relative`} key={contacto.id} onClick={() => handleTarjetaClick(contacto.id)}>
                            <p><b>Nombre:</b> {contacto.nombre} {contacto.apellido}</p>
                            <p><b>Teléfono:</b> {contacto.telefono}</p>
                        </div>
                    ))}
                </div>
                <div className="column">
                    {contactos.slice(6, 12).map(contacto => (
                        <div className={`contact-card ${mostrarContactos ? 'scale-100' : 'scale-0'} transition-transform duration-1000 relative`} key={contacto.id} onClick={() => handleTarjetaClick(contacto.id)}>
                            <p><b>Nombre:</b> {contacto.nombre} {contacto.apellido}</p>
                            <p><b>Teléfono:</b> {contacto.telefono}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));









