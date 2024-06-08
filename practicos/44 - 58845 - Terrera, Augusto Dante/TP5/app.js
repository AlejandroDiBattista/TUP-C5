import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 1, nombre: 'John', apellido: 'Doe', edad: 30, borrado: false, actualizado: 1 },
    { id: 2, nombre: 'Jane', apellido: 'Smith', edad: 25, borrado: false, actualizado: 2 },
    { id: 3, nombre: 'Michael', apellido: 'Johnson', edad: 40, borrado: false, actualizado: 3 },
    { id: 4, nombre: 'Emily', apellido: 'Davis', edad: 35, borrado: false, actualizado: 4 },
    { id: 5, nombre: 'Daniel', apellido: 'Brown', edad: 28, borrado: false, actualizado: 5 }
]

app.get('/personas', (req, res) => {
    const personasNoBorradas = datos.filter(p => !p.borrado)
    res.send(personasNoBorradas)
});

app.put('/personas', (req, res) => {
    // Implementar PUT
    const nuevaPersona = req.body
    if (nuevaPersona.id) {
        const existe = datos.findIndex(p => p.id === nuevaPersona.id)
        if (existe === -1) {
            res.status(404).json("Persona no encontrada")
            return
        }
        datos[existe] = { ...datos[existe], ...nuevaPersona }
        res.status(201).send(datos[existe])
        return
    } else {
        nuevaPersona.id = datos.length + 1
        datos.push(nuevaPersona)
        res.status(201).send(nuevaPersona)
        return
    }
})

export default app