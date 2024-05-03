const App = () => (
   <div className="centrado">
      <h1>¡Hola mundo!</h1>
      <h2>Lista de contactos</h2>
      <Agenda />
   </div>
);

const db = [
   { id: 0, nombre: "Lautaro", apellido: "Juarez", telefono: "3815478937" },
   { id: 1, nombre: "Tobias", apellido: "Velazquez", telefono: "381545234" },
   { id: 2, nombre: "Lucas", apellido: "Lazarte", telefono: "381547423" },
   { id: 3, nombre: "Diego", apellido: "Cervera", telefono: "3815478232" },
   { id: 4, nombre: "Lisandro", apellido: "God", telefono: "3815475342" },
   { id: 5, nombre: "Esteban", apellido: "Gonzalez", telefono: "3815471234" },
   { id: 6, nombre: "Luciano", apellido: "Donelli", telefono: "3815476544" }
]

const Contacto = ({ nombre, apellido, telefono }) => (
   <div className="tarjetaContacto">
      <p>{nombre} {apellido}</p>
      <p>Telefono: {telefono}</p>
   </div>
);

const Agenda = () => (
   <div>
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
