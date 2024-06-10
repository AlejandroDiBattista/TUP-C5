import express from 'express'
import loger from 'morgan'
import cookieParser from 'cookie-parser'

import routerUsuario from './usuario.router.js'

const app = express()

app.use(express.static('./public'));
app.use(express.json())
app.use(loger('dev'))
app.use(cookieParser())

app.get('/traer', (req, res) => {
    console.log("traer en la consola del servidor")
    res.json({ nombre: "Juan", apellido: "Perez" })
})

app.post('/guardar', (req, res) => {
    console.log("guardar en la consola del servidor")
    console.log("REQ>", req)
    console.log("BODY>", req.body)
    res.header("X-Ouput", "Enviado en el header")
    res.json({ mensaje: 'Ok' })
})

app.use(routerUsuario)

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000")
})
