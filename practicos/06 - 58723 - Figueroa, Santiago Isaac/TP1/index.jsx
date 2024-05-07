const listadecontactos = [
    
    { id: 1, nombre: "Lucía", apellido: "Hernández", telefono: "123456789" },
    { id: 2, "nombre": "Santiago", "apellido": "Gutiérrez", "telefono": "234567890" },
    { "id": 3, "nombre": "Valentina", "apellido": "Rodríguez", "telefono": "345678901" },
    { "id": 4, "nombre": "Diego", "apellido": "Martínez", "telefono": "456789012" },
    { "id": 5, "nombre": "Camila", "apellido": "Pérez", "telefono": "567890123" },
    { "id": 6, "nombre": "Mateo", "apellido": "Gómez", "telefono": "678901234" },
    { "id": 7, "nombre": "Martina", "apellido": "Fernández", "telefono": "789012345" },
    { "id": 8, "nombre": "Juan", "apellido": "Sánchez", "telefono": "890123456" },
    { "id": 9, "nombre": "Lucas", "apellido": "López", "telefono": "901234567" },
    { "id": 10, "nombre": "Sofía", "apellido": "Martín", "telefono": "012345678" },
    { "id": 11, "nombre": "Elena", "apellido": "Díaz", "telefono": "123456789" },
    { "id": 12, "nombre": "Mariano", "apellido": "García", "telefono": "234567890" },
    { "id": 13, "nombre": "Isabella", "apellido": "Ruiz", "telefono": "345678901" },
    { "id": 14, "nombre": "Tobías", "apellido": "Herrera", "telefono": "456789012" },
    { "id": 15, "nombre": "Valentín", "apellido": "Flores", "telefono": "567890123" },
    { "id": 16, "nombre": "Catalina", "apellido": "Vázquez", "telefono": "678901234" },
    { "id": 17, "nombre": "Bruno", "apellido": "Molina", "telefono": "789012345" },
    { "id": 18, "nombre": "Amelia", "apellido": "Alvarez", "telefono": "890123456" },
    { "id": 19, "nombre": "Facundo", "apellido": "Moreno", "telefono": "901234567" },
    { "id": 20, "nombre": "Abril", "apellido": "Benítez", "telefono": "012345678" },
    { "id": 21, "nombre": "Tomás", "apellido": "Suárez", "telefono": "123456789" },
    { "id": 22, "nombre": "Mía", "apellido": "Castillo", "telefono": "234567890" },
    { "id": 23, "nombre": "Franco", "apellido": "Luna", "telefono": "345678901" },
    { "id": 24, "nombre": "Clara", "apellido": "Acosta", "telefono": "456789012" },
    { "id": 25, "nombre": "Emilia", "apellido": "Rojas", "telefono": "567890123" },
    { "id": 26, "nombre": "Sebastián", "apellido": "Sosa", "telefono": "678901234" },
    { "id": 27, "nombre": "Victoria", "apellido": "Ortega", "telefono": "789012345" },
    { "id": 28, "nombre": "Dante", "apellido": "Ibañez", "telefono": "890123456" },
    { "id": 29, "nombre": "Juana", "apellido": "Paz", "telefono": "901234567" },
    { "id": 30, "nombre": "Leandro", "apellido": "Aguilar", "telefono": "012345678" }
  
  
];

/*Despues de ser llamada por el ReactDOM.Render
cumple sus funciones las cuales son mapear el vector listadecontactos
y guardarlo en objcontacto (creando el objeto que contiene los valores
de cada vector, ademas llama a la funcion Contacto)
.*/

const App = () => (

<div className="body">

    <h1>Agenda Contactos</h1>
    {/* .map lee el vector listadecontactos y a su vez saca sus valores
    y los guarda en objcontacto (creando un nuevo objeto) e invoca a Contacto
    y le retorna valores por parametros*/}
    {listadecontactos.map(objcontacto => (
        <Contactohtml key={objcontacto.id} {...objcontacto} />
    ))}

</div>
);


//Contact segun vaya recibiendo valores por sus parametros
//va creando el html y mostrando los valores recibidos.

const Contactohtml = ({ id, nombre, apellido, telefono }) => (

<div className="contacto">

    <div id="id">

        <p> <span className="id">N°</span>{id} </p>

    </div>

    <h3 className='nombre-contacto'>{apellido} {nombre}</h3>

    <p id="num"><span>Telefono: {telefono}</span></p>

</div>
);


//Aqui se llama a la variable App. (Siguen en linea 37 y 38)
ReactDOM.render(<App />, document.getElementById('root'))

