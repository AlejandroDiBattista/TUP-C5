let contactos = [
    {id: 1, nombre: 'Emiliano', apellido: 'Stemberger', telefono: '1111'},
    {id: 2, nombre: 'Shaquille', apellido: "O'neal", telefono: '2222'},
    {id: 3, nombre: 'Lionel', apellido: 'Messi', telefono: '3333'},
    {id: 4, nombre: 'Cristiano', apellido: 'Ronaldo', telefono: '4444'},
    {id: 5, nombre: 'Emanuel', apellido: 'Ginobili', telefono: '5555'},
    {id: 6, nombre: 'Michael', apellido: 'Jordan', telefono: '6666'},
]

const Contacto = ({id, nombre, apellido, telefono}) =>
    <div>
        <p><b>Id:</b>{id}</p>
        <p><b>Nombre:</b>{nombre}</p>
        <p><b>Apellido:</b> {apellido}</p>
        <p><b>Teléfono:</b>{telefono}</p>
    </div>

const App = () =>  (
    <div>
        <h1>¡Hola, mundo!</h1>
        <p>¡Bienvenidos a React!</p>
        <Contacto id = " 1 " nombre = " Emiliano " apellido = " Stemberger " telefono= " 1111 "/> 
        <Contacto id = " 2 " nombre = " Shaquille " apellido = " O'neal " telefono= " 2222 "/> 
        <Contacto id = " 3 " nombre = " Lionel " apellido = " Messi " telefono= " 3333 "/> 
        <Contacto id = " 4 " nombre = " Facundo " apellido = " Campazzo " telefono= " 4444 "/> 
        <Contacto id = " 5 " nombre = " Emanuel " apellido = " Ginobili " telefono= " 5555 "/> 
        <Contacto id = " 6 " nombre = " Michael " apellido = " Jordan " telefono= " 6666 "/> 
        
    </div>
)


ReactDOM.render(<App/> , document.getElementById('root'))