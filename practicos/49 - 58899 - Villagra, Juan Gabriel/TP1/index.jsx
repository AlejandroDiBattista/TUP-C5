const App = () => {
  let lista = [
    { id: 1, nombre: "Eugenia", apellido: "Rodriguez", tel: '+' + 3814432123 },
    { id: 2, nombre: 'Marcos', apellido: 'Diaz', tel: '+' + 3817654321 },
    { id: 3, nombre: 'Lucas', apellido: 'Juarez', tel: '+' + 3817924680 },
    { id: 4, nombre: 'Ana', apellido: 'Reinoso', tel: '+' + 3818013579 },
    { id: 5, nombre: 'Ramon', apellido: 'Gerez', tel: '+' + 3816543210 },
    { id: 6, nombre: 'Claudia', apellido: 'Rodríguez', tel: '+' + 3813456789 },
    { id: 7, nombre: 'Ulises', apellido: 'Acuña', tel: '+' + 3819012345 },
    { id: 8, nombre: 'Laura', apellido: 'Díaz', tel: '+' + 3810987654 },
    { id: 9, nombre: 'Nahuel', apellido: 'Sánchez', tel: '+' + 3810123456 },
    { id: 10, nombre: 'Alejandra', apellido: 'Monteros', tel: '+' + 3815678901 },
    { id: 11, nombre: 'Mario', apellido: 'Orellana', tel: '+' + 3811234567 },
    { id: 12, nombre: 'Sheila', apellido: 'Flores', tel: '+' + 3817890123 },
  ]

  const Agenda = () => {
    return (
      <h1 className="Title">Contactos:
        <div className="li"  >{lista.map(contac => (
          <div className="id">Id: {contac.id}
            <h3 className="name">Nombre: {contac.nombre} </h3>
            <h4 className="cards">Apellido: {contac.apellido}</h4>
            <p className="cardsT">Tel: {contac.tel}</p>
          </div>
        ))}
        </div>
      </h1>
    )
  }

  return (    <Agenda />  )
}


ReactDOM.render(<App />, document.getElementById('root'))