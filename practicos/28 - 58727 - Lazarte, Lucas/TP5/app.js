import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    // Datos de ejemplo  
    { id: 1, nombre: 'Oscar', apellido: 'Aguirre', edad: 38, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Cesar', apellido: 'Torres', edad: 52, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Valeria', apellido: 'Alvarez', edad: 22, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'Lucia', apellido: 'Gutierrez', edad: 39, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Pedro', apellido: 'Diaz', edad: 64, borrado: false, actualizado: Date.now() }, 
]

app.get('/personas', (req, res) => {
    // Implementar GET_ALL
    const personas = datos.filter(persona => !persona.borrado)
    res.status(200).json(personas)
});

app.put('/personas', (req, res) => {
    // Implementar PUT
    const persona = req.body

    if (persona.id) {
        const index = datos.findIndex(p => p.id === persona.id)
        if (index === -1) {
            res.status(404).send('Persona no encontrada')
        } else {
            datos[index] = { ...datos[index], ...persona, actualizado: Date.now() }
            res.status(201).json(datos[index])
        }
    } else {
        const nuevaPersona = {
            id: datos.length ? datos[datos.length - 1].id + 1 : 1,
            ...persona,
            borrado: false,
            actualizado: Date.now()
        }
        datos.push(nuevaPersona)
        res.status(201).json({ id: nuevaPersona.id })
    }
})

export default app