const saludar = (req, res) => {
    console.log(req.query)
    let { nombre } = req.query
    res.send("<h1>Bienvenido " + nombre + "</h1>")
}

const raiz = (req, res) => {
    res.send("<h1>Estamos en un get</h1>")
}

const despedir = (req, res) => {
    console.log(req.query)
    console.log(req.params)

    const { nombre, edad } = req.params
    res.send("<h1>Bienvenido " + nombre.toUpperCase() +

        " tiene " + edad + " años</h1>")
}
Prueba = {
    saludar, 
    raiz, 
    despedir
}

export default Prueba