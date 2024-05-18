const listaContactos = [
    {id: 1, nombre: "Axel", apellido: "Peralta", telefono: "3865408294"},
    {id: 2, nombre: "Facundo", apellido: "Gomez", telefono: "38147894"},
    {id: 3, nombre: "Fausto", apellido: "Lopez", telefono: "38176648"},
    {id: 4, nombre: "Martin", apellido: "Gonzales", telefono: "38136889"},
    {id: 5, nombre: "Matias", apellido: "Lovey", telefono: "381324687"},
    {id: 6, nombre: "Emiliano", apellido: "NN", telefono: "381324687"},
    {id: 7, nombre: "Federico", apellido: "NN", telefono: "381324687"},
    {id: 8, nombre: "julian", apellido: "NN", telefono: "381324687"},
    {id: 9, nombre: "Alexis", apellido: "Lima", telefono: "381324687"},
]

const Contactos = ({nombre, apellido, telefono}) => (
    <div className="contacto">
        <h1>{nombre} {apellido}</h1>
        <p>Celular: {telefono} </p>
    </div>
)

const Agenda = () => {
    const cuadrantes = [];

    // Dividir los contactos en grupos de 3 para cada cuadrante
    for (let i = 0; i < listaContactos.length; i += 3) {
        cuadrantes.push(listaContactos.slice(i, i + 3));
    }

    const colores = ['lightblue', 'lightgreen', 'lightpink', 'lightyellow']; // Lista de colores

    return (
        <div className="agendacontactos">
            {cuadrantes.map((cuadrante, index) => (
                <div key={index} className="cuadrante" style={{ backgroundColor: colores[index % colores.length] }}>
                    {cuadrante.map(contacto => (
                        <Contactos
                            key={contacto.id}
                            nombre={contacto.nombre}
                            apellido={contacto.apellido}
                            telefono={contacto.telefono}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

const App = () =>  (
    <div className="contenedor">
        <Agenda />
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
