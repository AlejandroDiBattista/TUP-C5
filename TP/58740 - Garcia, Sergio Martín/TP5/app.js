import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    // Datos de ejemplo  
    { id: 1, nombre: 'Juan', apellido: 'Mendez', edad: 33, borrado: false, actualizado: 1 },
    { id: 2, nombre: 'Marcos', apellido: 'Perez', edad: 29, borrado: false, actualizado: 2 },
    { id: 3, nombre: 'Maria', apellido: 'Lopez', edad: 25, borrado: false, actualizado: 3 },
    { id: 4, nombre: 'Patricia', apellido: 'Robles', edad: 27, borrado: false, actualizado: 4 },
    { id: 5, nombre: 'Jose', apellido: 'Lopez', edad: 23, borrado: false, actualizado: 5 },
    { id: 6, nombre: 'Ana', apellido: 'Lopez', edad: 21, borrado: false, actualizado: 6 }
]

app.get('/personas', (req, res) => {
    // Implementar GET_ALL
    res.status(200).json(datos.filter(persona => !persona.borrado))

});


app.put('/personas', (req, res) => {
    // Implementar PUT

    /*const persona = req.body
    datos.push(persona)
    res.status(201).send(persona)*/

    const { id, nombre, apellido, edad, borrado } = req.body
    if (id) {
        const index = datos.findIndex(p => p.id === parseInt(id))
        if (index !== -1) {
            datos[index] = { ...datos[index], nombre, apellido, edad, borrado: borrado !== undefined ? borrado : datos[index].borrado, actualizado: Date.now() }
            res.status(201).json(datos[index])
        } else {
            res.status(404).json({ error: 'Persona no encontrada' })
        }
    } else {
        const nuevaPersona = req.body;
        const nuevoId = datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1
        const personaconId = { ...nuevaPersona, id: nuevoId, borrado: false, actualizado: Date.now() }
        datos.push(personaconId)
        res.status(201).json(personaconId)
    }

})

export default app