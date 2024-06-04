import express from "express"
import morgan from 'morgan'
import productos from "./productos.js"

const app = express()

let datos = [
    { id: 1, nombre: "Juan", apellido: "Perez" },
    { id: 2, nombre: "Ana", apellido: "Gomez" },
    { id: 3, nombre: "Pedro", apellido: "Garcia" },
    { id: 4, nombre: "Maria", apellido: "Rodriguez" },
]

app.use(morgan('dev'))
app.use(express.json())

app.use("/productos", productos)

app.get("/home")
app.listen(3000, () => {
    console.log("Servidor funcionando en 3000")
    console.log("http://localhost:3000/")
})