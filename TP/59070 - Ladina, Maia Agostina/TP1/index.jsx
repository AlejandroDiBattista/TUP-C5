const contactos = [
    {
        ID: 1,
        Nombre: "Maia Agostina",
        Apellido: "Ladina",
        Telefono: "3815895996",
    },

    {
        ID: 2,
        Nombre: "Maite Valentina",
        Apellido: "Ladina",
        Telefono: "3814188353",
    },

    {
        ID: 3,
        Nombre: "Blanca Gabriela",
        Apellido: "Medina",
        Telefono: "3814442759",
    },

    {
        ID: 4,
        Nombre: "Pablo Daniel",
        Apellido: "Ladina",
        Telefono: "3813407088",
    },

    {
        ID: 5,
        Nombre: "Daiana Micaela",
        Apellido: "Medina",
        Telefono: "3816948785",
    },
 ];

 const Contacto = ({ Nombre, Apellido, Telefono}) => (

    <div className="contact-card" >
        <h1>{Nombre} {Apellido}</h1>
        <p>Telefono: {Telefono}</p> 
    </div>
 )

 const Agenda = () => (
    <div className="agenda-card">
        {
            contactos.map (contacto => <Contacto key={contacto.ID}
                Nombre={contacto.Nombre}
                Apellido={contacto.Apellido}
                Telefono={contacto.Telefono}
            />)
        }

    </div>
 )

const App = () =>  (
    <div>
        <Agenda/>   
    </div>
    
)

ReactDOM.render(<App />, document.getElementById('root'))