import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import Datos from './servicios/datos.js'


const app = express()

app.use(express.json())

const contactos = await Datos.readAll()
console.log(contactos)

app.get('/borrar-todo', async (req, res) => {
    const contactos = await Datos.deleteAll()
    res.json(contactos)
})

app.get('/agregar-todo', async (req, res) => {
    await Datos.create({ nombre: 'Juan', edad: 20 })
    await Datos.create({ nombre: 'Ana', edad: 25 })
    await Datos.create({ nombre: 'Pedro', edad: 30 })
    await Datos.create({ nombre: 'Maria', edad: 35 })
    res.send('Datos agregados')
})

app.get('/contactos', async (req, res) => {
    try {
        const contactos = await Datos.readAll()
        res.json(contactos)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/contacto', async (req, res) => {
    try {
        const contactos = await Datos.read('667255123a8af9b427c1a079')
        res.json(contactos)
    } catch (error) {
        res.status(500).send(error)
    }
})


app.get('/agregar', async (req, res) => {
    try {
        const contactos = await Datos.create({ nombre: 'Analia', edad: 25 })
        res.json(contactos)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get("/cerrar", async (req, res) => {
    try {
        await Datos.close()
        res.send('Conexión cerrada')
    } catch (error) {
        res.status
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${process.env.PORT}`)
})



