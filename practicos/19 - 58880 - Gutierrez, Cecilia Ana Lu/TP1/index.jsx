const App = () =>  (
    <div className="div-b">
       <h1>AGENDA</h1>
        <div className="contacts">
            {
                PersonasContacto.map(contact => <Contacto key={contact.id} {...contact} />)
            }
        </div>
    </div>
)

let PersonasContacto=[
    {id:1,nombreC:'Valeria',apellidos:'Lazarte',numero:'3819298410',domicilio:'España 680'},
    {id:2,nombreC:'Graciela',apellidos:'Silva',numero:'3812839117',domicilio:'General Paz 100'},
    {id:3,nombreC:'Geraldine',apellidos:'Villalba',numero:'3816672509',domicilio:'no registrado'},
    {id:4,nombreC:'Rita',apellidos:'Pedraza',numero:'3818768743',domicilio:'Barrio Arcor'},
    {id:5,nombreC:'Luisa',apellidos:'Lazarte',numero:'3811326252',domicilio:'Lules'},
    {id:6,nombreC:'Fabian',apellidos:'Gutierrez',numero:'3814832941',domicilio:'Los Tarcos'}
]

const Contacto = ({id, nombreC, apellidos, numero, domicilio}) => (
    <div class="div-Contactos">
        <h2>{id}.{nombreC} {apellidos}</h2>
        <p>Numero Telefonico: {numero}</p>
        <p>Domicilio: {domicilio}</p>
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'));