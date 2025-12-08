const App = () => {
    const personas = [
        { id: 1, nombre: 'Juan', apellido: 'Perez', telefono: '1234567890' },
        { id: 2, nombre: 'María', apellido: 'García', telefono: '0987654321' },
        { id: 3, nombre: 'Pedro', apellido: 'Martínez', telefono: '1357924680' },
        { id: 4, nombre: 'Ana', apellido: 'López', telefono: '2468013579' },
        { id: 5, nombre: 'Carlos', apellido: 'Gómez', telefono: '9876543210' },
        { id: 6, nombre: 'Sofía', apellido: 'Rodríguez', telefono: '0123456789' },
        { id: 7, nombre: 'Luis', apellido: 'Hernández', telefono: '6789012345' },
        { id: 8, nombre: 'Laura', apellido: 'Díaz', telefono: '3210987654' },
        { id: 9, nombre: 'Diego', apellido: 'Sánchez', telefono: '7890123456' },
        { id: 10, nombre: 'Alejandra', apellido: 'Torres', telefono: '2345678901' },
        { id: 11, nombre: 'Manuel', apellido: 'Ramírez', telefono: '8901234567' },
        { id: 12, nombre: 'Carmen', apellido: 'Flores', telefono: '4567890123' },
        { id: 13, nombre: 'Jorge', apellido: 'Gutiérrez', telefono: '9012345678' },
        { id: 14, nombre: 'Gabriela', apellido: 'Ruiz', telefono: '5678901234' },
        { id: 15, nombre: 'Fernando', apellido: 'Alvarez', telefono: '2345678901' },
        { id: 16, nombre: 'Verónica', apellido: 'González', telefono: '6789012345' },
        { id: 17, nombre: 'Miguel', apellido: 'Ortega', telefono: '1234567890' },
        { id: 18, nombre: 'Patricia', apellido: 'Jiménez', telefono: '7890123456' },
        { id: 19, nombre: 'Roberto', apellido: 'Núñez', telefono: '3456789012' },
        { id: 20, nombre: 'Daniela', apellido: 'Cruz', telefono: '9012345678' }
    ];

    const Contacto = () => {
        return (
            <div>
                {personas.map(persona => (
                    <div key={persona.id} className="targeta">
                        <h1>{persona.nombre} {persona.apellido}</h1>
                        <p>Teléfono: {persona.telefono}</p>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <Contacto/>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))