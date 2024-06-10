import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

let datos = [
    {id: 1, nombre:'Juan', apellido:'Perez', edad: 27, borrado: false, actualizado: 3},
    {id: 2, nombre:'Enrique', apellido:'Gomez', edad: 26, borrado: false, actualizado: 2},
    {id: 3, nombre:'Matias', apellido:'Lopez', edad: 23, borrado: false, actualizado: 1},
    {id: 4, nombre:'Nicolas', apellido:'Ruiz', edad: 22, borrado: false, actualizado: 5},
    {id: 5, nombre:'Sebastian', apellido:'Diaz', edad: 20, borrado: false, actualizado: 6},
]

const asignarId = () => {
    const ids = datos.map(persona => persona.id)
    const maxId = Math.max(...ids)
    return maxId + 1
}

app.get('/personas', (req, res) => {
    const personasNoBorradas = datos.filter(p => !p.borrado)
    res.send(personasNoBorradas)
});

app.put('/personas', (req, res) => {
    const persona = req.body

    if (persona.id) {
        const indice = datos.findIndex(p => p.id === persona.id)

        if (indice === -1) {
            res.status(404).send({error: 'Persona no encontrada'})
        }
        if (persona.borrado) {
            datos[indice].borrado = true
            return res.status(201).json(datos[indice])
        }
        else {
            datos[indice] = {...datos[indice], ...persona}
        return res.status(201).json(datos[indice])
        }
    }
    else {
    persona.id = asignarId()
    persona.borrado = false
    persona.actualizado = 1
    datos.push(persona)

    return res.status(201).json(persona)
    }
})

export default app