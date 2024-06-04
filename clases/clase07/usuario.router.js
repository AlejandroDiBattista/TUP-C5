import Router from 'express'

// {nombre, clave, verificado, activo, token}
const router = Router()

let usuarios = []

function getToken() {
    return Math.random().toString(16).slice(2)
}

router.post("/registrar", (req, res) => {
    const { email, clave } = req.body
    const nombre = email

    if (usuarios.find(usuario => usuario.nombre == nombre)) {
        res.status(400).json({ mensaje: "Usuario ya registrado" })
        return
    }

    const token = getToken()

    usuarios.push({ nombre, clave, token, verificado: false })

    const verificar = `/verificar/${token}`
    res.json({ ok: true, verificar })
})

router.get("/verificar/:token", (req, res) => {
    const token = req.params.token
    console.log("GET Verificar | Token=", token)
    const usuario = usuarios.find(u => u.token == token)
    if (usuario) {
        usuario.verificado = true
        res.json({ ok: true, mensaje: "Usuario verificado" })
    } else {
        res.status(404).json({ ok: false, mensaje: "Usuario no encontrado" })
    }
})

router.post("/ingresar", (req, res) => {
    const { email, clave } = req.body
    const nombre = email.trim().toLowerCase()

    const usuario = usuarios.find(u => u.nombre == nombre && u.clave == clave)
    if (usuario) {
        if (usuario.verificado) {
            usuario.token = getToken()
            usuario.activo = true
            res.cookie.set("token", usuario.token)
            res.json({ ok: true })
        } else {
            res.status(401).json({ usuario, ok: false, mensaje: "Usuario no verificado" })
        }
    } else {
        res.status(404).json({ ok: false, mensaje: "El usuario y/o contraseña erroneos" })
    }
})

router.post("/salir", (req, res) => {
    const token = req.cookies.token
    const usuario = usuarios.find(usuario => usuario.token == token)
    if (usuario) {
        usuario.activo = false
        res.json({ ok: true })
    } else {
        res.status(404).json({ ok: false, mensaje: "No hay usuario logeado" })
    }
    res.clearCookie("token")
})

export default router