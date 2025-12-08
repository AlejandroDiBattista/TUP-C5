import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

let datos = [
    // Datos de ejemplo
    { id: 1, nombre: 'Juan', apellido: 'Perez', edad: 30, borrado: false, actualizado: 1 },
    { id: 2, nombre: 'Pedro', apellido: 'Gonzalez', edad: 25, borrado: false, actualizado: 2 },
    { id: 3, nombre: 'Maria', apellido: 'Lopez', edad: 20, borrado: false, actualizado: 3 },
    { id: 4, nombre: 'Luis', apellido: 'Garcia', edad: 35, borrado: false, actualizado: 4 },
    { id: 5, nombre: 'Ana', apellido: 'Martinez', edad: 28, borrado: false, actualizado: 5 },
    { id: 6, nombre: 'Carlos', apellido: 'Sanchez', edad: 40, borrado: false, actualizado: 6 },
];
let idActual = datos.length + 1

app.get('/personas', (req, res) => {
    //Implementar GET_ALL
    const personasNoBorradas = datos.filter(p => !p.borrado);
    res.send(personasNoBorradas);
    res.send(datos)
})

app.put('/personas', (req, res) => {
    //Implementar SET
    const persona = req.body
    if (persona.id) {
        const indice = datos.findIndex(p => p.id === persona.id)
        if (indice === -1) {
            return res.status(404).send()
        }
        datos[indice] = { ...datos[indice], ...persona }
        return res.status(201).json(datos[indice])
    } else {
        persona.id = idActual++
        persona.borrado = false
        persona.actualizado = 1
        datos.push(persona)
        return res.status(201).json(persona)
    }
})

export default app