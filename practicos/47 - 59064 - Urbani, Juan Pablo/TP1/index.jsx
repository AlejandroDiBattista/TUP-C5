const ListaCompleta = [ 
    {id : 1 , nombre: "Juan Pablo " , apellido: "Urbani", telefono: "0381 1234567" },
    {id : 2 , nombre:  "Agustina Carla" , apellido: "Rojas", telefono: "0381 0123456"  }, 
    {id : 3 , nombre:  "Andrea" , apellido: "Vaca", telefono: "0381 5678901"  }, 
    {id : 4 , nombre:  "Gabriela" , apellido: "Villgra", telefono: "0381 6789012" }, 
    {id : 5 , nombre:  "Juan Jose" , apellido: "Paso", telefono: "0381 9012345"  }, 
    {id : 6 , nombre:  "Juan Bautista" , apellido: "Alberdi", telefono: "0381 7890123" }, 
    {id : 7 , nombre:  "Domingo " , apellido: "Matheu", telefono: "0381 8901234"  }, 
];

const Contacto = ({nombre, apellido, telefono}) => (
    <div className="contact-container">
        <h3>Nombre: {nombre}</h3>
        <p>Apellido: {apellido}</p>
        <p>Telefono: {telefono}</p>
    </div>
);

const Agenda = () => (
    <div>
        {ListaCompleta.map((contacto) => (
            <Contacto
                key={contacto.id}
                nombre={contacto.nombre}
                apellido={contacto.apellido} 
                telefono={contacto.telefono}
            />
        ))}
    </div>
);

const App = () => {
    return (
        <div>
            <h1>Agenda</h1>
            <Agenda />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
