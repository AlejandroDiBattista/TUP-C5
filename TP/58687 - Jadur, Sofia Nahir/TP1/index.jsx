const ListaCompleta = [
    { id: 1, nombre: "Martina", apellido: "Salazar", telefono: "1234567" },
    { id: 2, nombre: "Camila", apellido: "Robles", telefono: "3453656" },
    { id: 3, nombre: "Jose", apellido: "Rosello", telefono: "3453254" },
    { id: 4, nombre: "Sofia", apellido: "Jadur", telefono: "3453365" },
    { id: 5, nombre: "Belen", apellido: "Wiernna", telefono: "3453235" },
    { id: 6, nombre: "Jazmin", apellido: "Jadur", telefono: "4353454" },
    { id: 7, nombre: "Camila", apellido: "Diaz", telefono: "3453675" },
    { id: 8, nombre: "Ezequiel", apellido: "Robles", telefono: "3454447" },
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
            <p>Primer Tp de React</p>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));