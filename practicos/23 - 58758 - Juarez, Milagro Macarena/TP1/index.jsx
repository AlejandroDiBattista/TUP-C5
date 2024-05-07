
const App = () => {
    const contactos = [
      { id: 1, nombre: 'Pedro', apellido: 'Pablo', telefono: '3814678899' },
      { id: 2, nombre: 'Florencia', apellido: 'González', telefono: '3812345678' },
      { id: 3, nombre: 'Lara', apellido: 'Gomez', telefono: '381268933' },
      { id: 4, nombre: 'Lorenzo', apellido: 'Martin', telefono: '381865443' },
    ];
  
    return (
      <div>
        <h1>¡Hola, mundo!</h1>
        <p>¡Bienvenidos a React!</p>
        <div className="agenda">
          <h2>Agenda de Contactos</h2>
          {contactos.map(contacto => (
            <div key={contacto.id} className="contacto">
              <h3>{contacto.nombre} {contacto.apellido}</h3>
              <p><strong>Teléfono:</strong> {contacto.telefono}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
     

ReactDOM.render(<App />, document.getElementById('root'))