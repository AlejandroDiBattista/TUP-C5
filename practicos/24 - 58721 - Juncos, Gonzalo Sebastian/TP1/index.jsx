const App = () => {
  const contactos = [
    { id: 1, nombre: "Gonzalo", apellido: "Juncos", telefono: '38276464' },
    { id: 2, nombre: "Juan", apellido: "Perez", telefono: '9384665' },
    { id: 3, nombre: "Pedro", apellido: "Sanchez", telefono: '2832764646' },
    { id: 4, nombre: "Maria", apellido: "Gonzalez", telefono: '11223344' },
    { id: 5, nombre: "Juan", apellido: "Perez", telefono: '9384665' },
    { id: 6, nombre: "Leandro", apellido: "Juncos", telefono: '38164645' },
    { id: 7, nombre: "Agustin", apellido: "Juncos", telefono: '12734646' },
    { id: 8, nombre: "Miguel", apellido: "Arrieta", telefono: '9966533' },
    { id: 9, nombre: "Adriana", apellido: "Avila", telefono: '92938475' },
    { id: 10, nombre: "Cristella", apellido: "Cusumano", telefono: '93844747' },

  ];

  const Contacto = ({ nombre, apellido, telefono }) => (
    <div className="carta-contacto">
      <h2>{nombre} {apellido}</h2>
      <p>Telefono: {telefono}</p>
    </div>
  );

  const Agenda = ({ contactos }) => (
    <div className="agenda-carta">
      {contactos.map(contacto => (
        <Contacto
          key={contacto.id}
          nombre={contacto.nombre}
          apellido={contacto.apellido}
          telefono={contacto.telefono}
        />
      ))}
    </div>
  );


  return (
    <div>
      <center><h1>¡Hola, mundo!</h1></center>
      <center><p>¡Bienvenidos a React!</p></center>
      <Agenda contactos={contactos} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));