const App = () => {
  let contactos = [
    {
      id: 1,
      nombre: "Matias",
      apellido: "Prieto",
      tel: "3816079212",
    },
    {
      id: 2,
      nombre: "Andres",
      apellido: "Vaca",
      tel: "3819038943",
    },
    {
      id: 3,
      nombre: "Augusto",
      apellido: "Rojas",
      tel: "3816034565",
    },
    {
      id: 4,
      nombre: "Gabriel",
      apellido: "Villagra",
      tel: "3816025743",
    },
    {
      id: 5,
      nombre: "Lisandro",
      apellido: "Reinoso",
      tel: "3816025743",
    },
    {
      id: 6,
      nombre: "Augusto Dante",
      apellido: "Terrera",
      tel: "3816021575",
    },
    {
      id: 7,
      nombre: "Juan Pablo",
      apellido: "Urbani",
      tel: "3816024321",
    },
    {
      id: 8,
      nombre: "Ramiro",
      apellido: "Rintoul",
      tel: "3816022456",
    },
    {
      id: 9,
      nombre: "Patricio",
      apellido: "Fenández",
      tel: "3816025921",
    },
    {
      id: 10,
      nombre: "Eric",
      apellido: "Zerda",
      tel: "3816029542",
    },
  ];

  return (
    <div>
      <h1 className="titulo">Trabajo Practico N°1</h1>

      <div className="container">
        <div className="row">
          {contactos.map((contacto) => (
            <div className="col-sm-5" key={contacto.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">id : {contacto.id}</h5>
                  <p className="card-subtitle mb-2 text-body-secondary">
                    Nombre : {contacto.nombre}
                  </p>
                  <p className="card-subtitle mb-2 text-body-secondary">
                    Apellido : {contacto.apellido}
                  </p>
                  <p className="card-subtitle mb-2 text-body-secondary">
                    Teléfono : {contacto.tel}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
