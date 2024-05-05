// import React from 'react';
// 
class Agendas {
  constructor() {
    this.contactos = [];
  }

  agregarContactos(contacto) {
    this.contactos.push(contacto);
  }

  get contacto() {
    return this.contactos;
  }
}

class Contacto {
  static idContacto = 0;

  constructor(nombre, apellido, edad, telefono) {
    this._id = ++Contacto.idContacto;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.telefonos = telefono;
  }

  get id() {
    return this._id;
  }

  get _nombre() { return this.nombre };
  get _apellido() { return this.apellido };
  get _telefonos() { return this.telefonos };
  get _edad() { return this.edad };
}

let agenda = new Agendas();
let contacto1 = new Contacto("Juan", "Pedro", 30, 3816338546);
let contacto2 = new Contacto("Pedro", "Ruiz", 20, 3816338435);
let contacto3 = new Contacto("Ramiro", "Rinthoul", 20, 3816338432);
let contacto4 = new Contacto("Matias", "Prieto", 20, 3816338435);
let contacto5 = new Contacto("Paula", "Gonzales", 20, 3816343562);
let contacto6 = new Contacto("Pamela", "Mendoza", 20, 3816353612);
let contacto7 = new Contacto("Pamela", "Mendoza", 20, 3819843563);
let contacto8 = new Contacto("Pamela", "Mendoza", 20, 3816123463);
let contacto9 = new Contacto("Pamela", "Mendoza", 20, 3816332456);
let contacto10 = new Contacto("Patricio", "Perez", 20, 3816384732);
agenda.agregarContactos(contacto1);
agenda.agregarContactos(contacto2);
agenda.agregarContactos(contacto3);
agenda.agregarContactos(contacto4);
agenda.agregarContactos(contacto5);
agenda.agregarContactos(contacto6);
agenda.agregarContactos(contacto7);
agenda.agregarContactos(contacto8);
agenda.agregarContactos(contacto9);
agenda.agregarContactos(contacto10);

const App = () => (
  <div className="container">
    <h1 className="my-4">Listado de contactos</h1>
    <div className="row">
      {agenda.contacto.map((contact) => (
        <div key={contact.id} className="col-md-6 mb-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Contacto #{contact.id}</h5>
              <p className="card-text">Nombre: {contact._nombre}</p>
              <p className="card-text">Apellido: {contact._apellido}</p>
              <p className="card-text">Edad: {contact._edad}</p>
              <p className="card-text">Teléfono: {contact._telefonos}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));