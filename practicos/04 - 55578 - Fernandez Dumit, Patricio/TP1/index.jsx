function ListaContactos() {

    const contactos = [
      { id: 1, nombre: 'Lionel', apellido: 'Messi', telefono: '45915690' },
      { id: 2, nombre: 'Cristiano', apellido: 'Ronaldo', telefono: '40915840' },
      { id: 3, nombre: 'Cristian', apellido: 'Romero', telefono: '33967692' },
      { id: 4, nombre: 'Juan Luis', apellido: 'Bianchi', telefono: '95967550' },
      { id: 5, nombre: 'Fernando', apellido: 'Molina', telefono: '37550199' },
      { id: 6, nombre: 'Guillermo', apellido: 'Acosta', telefono: '44718039' },
    ];
  
    return (
      <div className="Lista-Contactos">

        <h1>Lista de contactos</h1>

        <ul>
          {contactos.map(contacto => (
            <li key={contacto.id}>

              <div className="contacto">
                <p className="nombre">{contacto.nombre}</p>
                <p className="apellido">{contacto.apellido}</p>
                <p className="telefono">{contacto.telefono}</p>
              </div>
              
            </li>
          ))}
        </ul>

      </div>
    );

  }
  
  ReactDOM.render(<ListaContactos />, document.getElementById('root'));
  