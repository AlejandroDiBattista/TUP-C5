let listaDeContactos = [
    { id: 1, nombre: "Alfonsina", apellido: "Storni", telefono: 3813648363 },
    { id: 2, nombre: "Ramon", apellido: "Rahman", telefono: 3813728663 },
    { id: 3, nombre: "Carlos", apellido: "Villagran", telefono: 3813648363 },
    { id: 4, nombre: "Elena", apellido: "García", telefono: 3811111111 },
    { id: 5, nombre: "Juan", apellido: "Martínez", telefono: 3812222222 },
    { id: 6, nombre: "Maria", apellido: "Prieto", telefono: 3813333333 },
    { id: 7, nombre: "Carlos", apellido: "Pérez", telefono: 3814444444 },
    { id: 8, nombre: "Sofía", apellido: "González", telefono: 3815325455 },
    { id: 9, nombre: "Diego", apellido: "Hernández", telefono: 3816836329 },
    { id: 10, nombre: "Valentina", apellido: "Díaz", telefono: 3817527747 },
    { id: 11, nombre: "Lucas", apellido: "Sánchez", telefono: 3818145624 },
    { id: 12, nombre: "Ana", apellido: "Fernández", telefono: 38199269443 }
    
]



let Listapreparada = () => {

    let arrayDeMuestra = [];

    listaDeContactos.forEach((datosC) => {

        arrayDeMuestra.push(<li>
            <div className="container-div id">{"ID: " + datosC.id}</div>
            <div className="container-div">{"Nombre: " + datosC.nombre}</div>
            <div className="container-div">{"Apellido: " + datosC.apellido}</div>
            <div className="container-div">{"Telefono: " + datosC.telefono}</div>
            <img src="https://imgs.search.brave.com/QYWcVt3fcpIaCaPBT8f4JffLK6khIkF9jCrPR3iwvJE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZnJlZWJpZXN1cHBs/eS5jb20vbG9nb3Mv/bGFyZ2UvMngvcmVh/Y3QtMS1sb2dvLWJs/YWNrLWFuZC13aGl0/ZS5wbmc" className="container-div img"/>
        </li>)

    })

    return arrayDeMuestra
}


const App = () => (
    <div>
        <h1>Lista de Contactos</h1>
        <ul className="container">
            {Listapreparada()}
        </ul>
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))

