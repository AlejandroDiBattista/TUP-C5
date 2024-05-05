// array que contiene la informacion de contactos
let contactos = [
  { id: 1, nombre: 'LeBron', apellido: 'James', telefono: '381 543 1234' },
  { id: 2, nombre: 'Stephen', apellido: 'Curry', telefono: '381 543 1234' },
  { id: 3, nombre: 'Kevin', apellido: 'Durant', telefono: '381 543 1234' },
  { id: 4, nombre: 'Giannis', apellido: 'Antetokounmpo', telefono: '38 543 1234' },
  { id: 6, nombre: 'Anthony', apellido: 'Davis', telefono: '381 543 1234' },
  { id: 7, nombre: 'Kawhi', apellido: 'Leonard', telefono: '381 543 1234' },
  { id: 8, nombre: 'Luka', apellido: 'Doncic', telefono: '381 543 1234' },
  { id: 9, nombre: 'Joel', apellido: 'Embiid', telefono: '381 543 1234' },
  { id: 10, nombre: 'Nikola', apellido: 'Jokic', telefono: '381 543 1234' },
  { id: 11, nombre: 'Damian', apellido: 'Lillard', telefono: '381 543 1234' },
];


const Contacto = ({ id, nombre, apellido, telefono }) => (
  <div className="contacto-item">
    <p className="color-p">Id: {id}</p>
    <p className="color-p">Nombre: {nombre} {apellido}</p>
    <p className="color-p">Telefono: {telefono}</p>
  </div>
);

const App = () => (
  <div className="contacto">
    <h1>Agenda</h1>
    {contactos.map((contacto) => (
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

ReactDOM.render(<App />, document.getElementById('root'))
