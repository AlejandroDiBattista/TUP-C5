import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div>
    <h1>¡Hola, mundo!</h1>
    <p>¡Bienvenidos a React!</p>
    <Agenda />
  </div>
);

const contactos = [
  { id: 1, nombre: 'Victoria', apellido: "Perez", telefono: '123-456-7890' },
  { id: 2, nombre: 'Maria', apellido: "Gomez", telefono: '987-654-3210' },
  { id: 3, nombre: 'Pedro', apellido: "Garcia", telefono: '545-001-9815' },
  { id: 4, nombre: 'Julieta', apellido: "Ponce", telefono: '198-010-1910' },
  { id: 5, nombre: 'Gabriel', apellido: "Fernandez", telefono: '391-088-6510' },
  { id: 6, nombre: 'Nicolas', apellido: "Guzman", telefono: '381-416-9412' },
];

const Contacto = ({ id, nombre, apellido, telefono }) => (
  <div>
    <h3>ID: {id} - {nombre} {apellido}</h3>
    <p>Telefono: {telefono}</p>
  </div>
);

const Agenda = () => (
  <div className="contacto">
    {contactos.map(contacto => (
      <Contacto
        key={contacto.id}
        id={contacto.id}
        nombre={contacto.nombre}
        apellido={contacto.apellido}
        telefono={contacto.telefono}
      />
    ))}
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

export default Agenda;
