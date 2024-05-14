const ListaCompleta = [
    { id: 1, nombre: "Gabriel ", apellido: "Salazar" },
    { id: 2, nombre: "Ezequiel", apellido: "Robles" },
    { id: 3, nombre: "Lautaro", apellido: "Rivadeneira" },
    { id: 3, nombre: "Lautaro", apellido: "Benjamin" },
    { id: 3, nombre: "Pedro", apellido: "Teseira" },
];

const Contacto = ({ nombre, apellido }) => (
    <div>
        <h3>Nombre: {nombre}</h3>
        <p>Apellido: {apellido}</p>
    </div>
);

const Agenda = () => (
    <div>
        {ListaCompleta.map((contacto) => (
            <Contacto
                key={contacto.id}
                nombre={contacto.nombre}
                apellido={contacto.apellido}
            />
        ))}
    </div>
);

const App = () => {
    return (
        <div>
            <h1>¡Hola!</h1>
            <Agenda />
            <p>Hola a todos</p>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));