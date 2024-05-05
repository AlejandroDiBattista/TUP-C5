const contac = [
    { id: 1, nombre: "maximo", apellido: "garcia", telefono: "000000" },
    { id: 2, nombre: "leonel", apellido: "messi", telefono: "0000000" },
    { id: 3, nombre: "cristiano", apellido: "ronaldo", telefono: "0000000" },
    { id: 4, nombre: "juan roman", apellido: "riquelme", telefono: "0000000" },
    { id: 5, nombre: "nicolas", apellido: "otamendi", telefono: "0000000" },
    { id: 6, nombre: "cristian", apellido: "romero", telefono: "0000000" },
    { id: 7, nombre: "lisandro", apellido: "martinez", telefono: "0000000" },
    { id: 8, nombre: "emiliano", apellido: "martinez", telefono: "0000000" },
];

const App = () => (
    <div className="CUERPO">
        <h1>CONTACTOS</h1>
        {contac.map(contacto => (
            <Contact key={contacto.id} {...contacto} />
        ))}
    </div>
);

const Contact = ({ id, nombre, apellido, telefono }) => (
    <div className="contacto">
        <div id="id">
            <p><span className="id">N°</span>{id}</p>
        </div>
        <h3 className='nombre-contacto'>{apellido} {nombre}</h3>
        <p id="num"><span>Telefono: {telefono}</span></p>
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));