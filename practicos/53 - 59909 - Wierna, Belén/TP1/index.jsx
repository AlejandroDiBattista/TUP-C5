const ListaCompleta = [ 
    {id : 1 , nombre: "Lucas" , apellido: "Mendez", telefono: "3816123456"},
    {id : 2 , nombre: "Mauricio" , apellido: "Gonzalez", telefono: "3816456789"},
    {id : 3 , nombre:  "Valeria" , apellido: "Galvan", telefono: "3813789456"},
    {id : 4 , nombre:  "Guillermina" , apellido: "Busto", telefono: "3816456123"},
    {id : 5 , nombre:  "Nahuel" , apellido: "Lara", telefono: "3813987654"},
    {id : 6 , nombre:  "Martina" , apellido: "Gutierrez", telefono: "3816255911"},
    {id : 7 , nombre:  "Sarahi" , apellido: "Paz", telefono: "3812587963"},
    {id : 8 , nombre:  "Sarahi" , apellido: "Godino", telefono: "3813147852"},
    {id : 9 , nombre:  "Sarahi" , apellido: "Nuñez", telefono: "3814561321"},
    {id : 10 , nombre:  "Sarahi" , apellido: "Perez", telefono: "3815789123"},
    {id : 11 , nombre:  "Sarahi" , apellido: "Real", telefono: "3816654321"},
    {id : 12 , nombre:  "Sarahi" , apellido: "Velardez", telefono: "3814258369"},
    {id : 13 , nombre:  "Sarahi" , apellido: "Lopez", telefono: "3815741147"},
    {id : 14 , nombre:  "Sarahi" , apellido: "Celiz", telefono: "3816951357"},
    {id : 15 , nombre:  "Sarahi" , apellido: "Casacci", telefono: "3816753951"},
];

const Contacto = ({nombre, apellido, telefono}) => (
    <div className="contacto-card">
        <h3>Nombre: {nombre}</h3>
        <p><b>Apellido:</b> {apellido}</p>
        <p><b>Teléfono:</b> {telefono}</p>
    </div>
);

const Agenda = () => (
    <div className="agenda">
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
            <h1>¡Hola!</h1>
            <Agenda />
            <p><b>Primer TP de React</b></p>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));