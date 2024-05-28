import express from "express"

const app = express()

app.get("/", (req, res) => {
    res.send("<h1>Estamos en un get</h1>")
})

app.get("/saludar", (req, res) => {
    console.log(req.query) 
    let { nombre } = req.query
    res.send("<h1>Bienvenido " + nombre + "</h1>")
})


app.get("/despedir/:nombre/:edad", (req, res) => {
    console.log(req.query)
    console.log(req.params)

    const {nombre, edad} = req.params
    res.send("<h1>Bienvenido " + nombre.toUpperCase() +
    
        " tiene " + edad + " años</h1>")
})


app.listen(3000, () => {
    console.log("Servidor funcionando en 3000")
    console.log("http://localhost:3000/")
})