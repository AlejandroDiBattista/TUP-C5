
let contactos = [
    { "id": 1, "nombre": "juan", "apellido": "ramirez", "telefono": "34545436", "email": "juanramirez@gmail.com" },
    { "id": 2, "nombre": "maria", "apellido": "gomez", "telefono": "34545437", "email": "mariagomez@gmail.com" },
    { "id": 3, "nombre": "luis", "apellido": "martinez", "telefono": "34545438", "email": "luismartinez@gmail.com" },
    { "id": 4, "nombre": "ana", "apellido": "rodriguez", "telefono": "34545439", "email": "anarodriguez@gmail.com" },
    { "id": 5, "nombre": "carlos", "apellido": "perez", "telefono": "34545440", "email": "carlosperez@gmail.com" },
    { "id": 6, "nombre": "laura", "apellido": "sanchez", "telefono": "34545441", "email": "laurasanchez@gmail.com" },
    { "id": 7, "nombre": "javier", "apellido": "lopez", "telefono": "34545442", "email": "javierlopez@gmail.com" },
    { "id": 8, "nombre": "sara", "apellido": "hernandez", "telefono": "34545443", "email": "sarahernandez@gmail.com" },
    { "id": 9, "nombre": "daniel", "apellido": "gonzalez", "telefono": "34545444", "email": "danielgonzalez@gmail.com" },
    { "id": 10, "nombre": "patricia", "apellido": "diaz", "telefono": "34545445", "email": "patriciadiaz@gmail.com" },
    { "id": 11, "nombre": "jorge", "apellido": "torres", "telefono": "34545446", "email": "jorgetorres@gmail.com" },
    { "id": 12, "nombre": "mariana", "apellido": "ramos", "telefono": "34545447", "email": "marianaramos@gmail.com" },
    { "id": 13, "nombre": "pablo", "apellido": "ortega", "telefono": "34545448", "email": "pabloortega@gmail.com" },
    { "id": 14, "nombre": "lucia", "apellido": "castro", "telefono": "34545449", "email": "luciacastro@gmail.com" },
    { "id": 15, "nombre": "fernando", "apellido": "nunez", "telefono": "34545450", "email": "fernandonunez@gmail.com" },
    { "id": 16, "nombre": "valeria", "apellido": "ibanez", "telefono": "34545451", "email": "valeriaibanez@gmail.com" },
    { "id": 17, "nombre": "sergio", "apellido": "vazquez", "telefono": "34545452", "email": "sergiovazquez@gmail.com" },
    { "id": 18, "nombre": "josefina", "apellido": "delgado", "telefono": "34545453", "email": "josefinadelgado@gmail.com" },
    { "id": 19, "nombre": "manuel", "apellido": "castillo", "telefono": "34545454", "email": "manuelcastillo@gmail.com" },
    { "id": 20, "nombre": "adriana", "apellido": "mendoza", "telefono": "34545455", "email": "adrianamendoza@gmail.com" },
    { "id": 21, "nombre": "raul", "apellido": "aguilar", "telefono": "34545456", "email": "raulaguilar@gmail.com" },
    { "id": 22, "nombre": "camila", "apellido": "valdez", "telefono": "34545457", "email": "camilavaldez@gmail.com" },
    { "id": 23, "nombre": "juan", "apellido": "ramirez", "telefono": "34545458", "email": "juanramirez@gmail.com" },
    { "id": 24, "nombre": "maria", "apellido": "gomez", "telefono": "34545459", "email": "mariagomez@gmail.com" },
    { "id": 25, "nombre": "luis", "apellido": "martinez", "telefono": "34545460", "email": "luismartinez@gmail.com" },

]

const Contacto = ({ nombre, apellido, telefono, email }) => (
    <div className="contacto" >
        <h3>{nombre} {apellido}</h3>
        <p>{telefono}</p>
        <p>{email}</p>
    </div>
)

const Agenda = () => (
    <div className="agenda">
        {
            contactos.map(contacto => <Contacto key={contacto.id}
                nombre={contacto.nombre}
                apellido={contacto.apellido}
                telefono={contacto.telefono}
                email={contacto.email}
            />)
        }</div>
)

const App = () => (
    <div>
        <Agenda />
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))