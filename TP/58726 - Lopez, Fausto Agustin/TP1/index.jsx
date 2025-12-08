const App = () => (
    <div>
        <h1>Agenda de Contactos</h1>
        <Agenda />
    </div>
)


const Contactos = ({ id, nombre, apellido, telefono }) => (
    <div className="Contactos">
        <h2>Contacto</h2>
        <p>{id} {nombre} {apellido}</p>
        <p>Telefono: {telefono}</p>
    </div>
)

const datosContactos = [
    { id: 1, nombre: `Fausto`, apellido: `López`, telefono: `381-6578787` },
    { id: 2, nombre: `Luis`, apellido: `Gonzalez`, telefono: `381-4831225` },
    { id: 3, nombre: `Mauro`, apellido: `Nahuz`, telefono: `381-5170002` },
    { id: 4, nombre: `Joaquin`, apellido: `Soria`, telefono: `381-4981234` },
    { id: 5, nombre: `Julian`, apellido: `Gomez`, telefono: `381-6324568` },
    { id: 6, nombre: `Martino`, apellido: `Montivero`, telefono: `381-5892341` },
    { id: 7, nombre: `Leandro`, apellido: `Campos`, telefono: `381-3882390` },
];

const Agenda = () => (
    <div className="ListaContactos">
        {datosContactos.map((Contacto) => (
            <Contactos
                id={Contacto.id}
                nombre={Contacto.nombre}
                apellido={Contacto.apellido}
                telefono={Contacto.telefono} />
        ))}
    </div>
);


ReactDOM.render(<App />, document.getElementById('root'))