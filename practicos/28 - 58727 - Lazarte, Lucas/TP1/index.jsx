const App = () => (
    <div>
      <h1>¡Hola, Rey!</h1>
      <p>¡Bienvenidos al mundo gaturro!</p>
      <Agenda/>
    </div>
  );

  const db = [
    { id: 0, nombre: "Lucas", apellido: "Lazarte", telefono: "381906790" },
    { id: 1, nombre: "Stiven", apellido: "Universe", telefono: "38489403" },
    { id: 2, nombre: "Andy", apellido: "Fort", telefono: "76315624" },
    { id: 3, nombre: "Riky", apellido: "Maravilla", telefono: "381638353" },
    { id: 4, nombre: "Toby", apellido: "Max", telefono: "38184134" }
  ];

  const Contacto = ({ nombre, apellido, telefono }) => (
    <div className="tarjetaContacto">
      <p>{nombre} {apellido}</p>
      <p>Telefono: {telefono}</p>
    </div>
  );

  const Agenda = () => (
    <div>
      <h1>Agenda contactos</h1>
      <div className="container">
        {db.map(contacto => (
          <Contacto
            key={contacto.id}
            nombre={contacto.nombre}
            apellido={contacto.apellido}
            telefono={contacto.telefono}
          />
        ))}
      </div>
    </div>
  );

  ReactDOM.render(<App />, document.getElementById('root'));