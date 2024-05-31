import Router from "express"

const router = Router()
router.post("/", (req, res) => {
    let persona = req.body
    let id = proximoID()
    datos = [...datos, { id, ...persona }]
    res.send({ id })
})

// ReadALl => GET /datos
router.get("/", (req, res) => {
    res.send(datos)
})
// Read => GET /datos
router.get("/:id", (req, res) => {
    let { id } = req.params
    let persona = datos.find(p => p.id == id)
    res.send(persona)
})

// Update => PUT /datos
router.put("/:id", (req, res) => {
    let { id } = req.params
    let persona = req.body
    console.log("Persona", persona)
    datos = datos.map(p => p.id == id ? { id, ...persona } : p)
    res.send(datos)
})

// Delete => DELETE /datos
router.delete("/:id", (req, res) => {
    let { id } = req.params
    datos = datos.filter(p => p.id != id)
    res.send(datos)
})

router.get("/home")

export default router