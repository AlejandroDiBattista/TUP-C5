const ListaCompleta = [ 
    {id : 1 , nombre: "Maria " , apellido: "Salazar", telefono: "1235589008" },
    {id : 2 , nombre: "Julieta" , apellido: "Robles", telefono: "2235846600"},
    {id : 3 , nombre:  "Ana" , apellido: "Rivadeneira", telefono: "123654789" }, 
    {id : 4 , nombre:  "Silvia" , apellido: "Salas", telefono: "584555925" }, 
    {id : 5 , nombre:  "Josefina" , apellido: "Fernandez", telefono: "381448593"  }, 
    {id : 6 , nombre:  "Juan" , apellido: "Rosello", telefono: "58692778"  }, 
    {id : 7 , nombre:  "Jorge" , apellido: "Sanchez", telefono: "32198756" }, 
    {id : 8 , nombre:  "Omar" , apellido: "Veron", telefono: "381859642"  }, 
    {id : 9 , nombre:  "Julian" , apellido: "Orellana", telefono: "22358914" }, 
    {id : 10 , nombre:  "Daniel" , apellido: "Wierna", telefono: "223569583"  }, 
];

const Contacto = ({nombre, apellido, telefono}) => (
    <div>
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
            <h1>¡Hola!</h1>
            <Agenda />
            <p>Primer Tp de React</p>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));