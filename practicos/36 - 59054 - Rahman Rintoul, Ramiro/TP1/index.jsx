const App = () => {
  let contactos = [{
    "id": 1,
    "name": "John",
    "apellido": " Doe",
    "phone": "+54705388272"
  }, {
    "id": 2,
    "name": "Jane",
    "apellido": " Doe",
    "phone": "+54024419291"
  }, {
    "id": 3,
    "name": "Bob",
    "apellido": " Smith",
    "phone": "+54130464503"
  }, {
    "id": 4,
    "name": "Alice",
    "apellido": " Smith",
    "phone": "+54764925705"
  }, {
    "id": 5,
    "name": "Charlie",
    "apellido": " Brown",
    "phone": "+54244019730"
  }, {
    "id": 6,
    "name": "David",
    "apellido": " Miller",
    "phone": "+54700897730"
  }, {
    "id": 7,
    "name": "Eve",
    "apellido": " Green",
    "phone": "+54737573885"
  }, {
    "id": 8,
    "name": "Frank",
    "apellido": " Jones",
    "phone": "+54975397820"
  }, {
    "id": 9,
    "name": "Grace",
    "apellido": " White",
    "phone": "+54903020934"
  }, {
    "id": 10,
    "name": "Henry",
    "apellido": " Davis",
    "phone": "+54388346849"
  }]
  return (
    <div className="app-container">
      <h1>Contactos</h1>
      <div className="contact-container">
        {
          contactos.map((contacto) => {
            return (
              <div className="contact" key={contacto.id}>
                <p style={{ fontWeight: 'bold', fontSize: '15px' }}>
                  {contacto.name}{contacto.apellido}
                </p>
                <p>{contacto.phone}</p>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}


ReactDOM.render(<App />, document.getElementById('root'));
