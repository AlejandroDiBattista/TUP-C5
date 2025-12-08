
const datos = [{ usuario: 'admin', contraseña: 'admin', correo: 'admin@gmail.com' }]

const gToken = () => {
    return Math.random().toString().substring(2)
}

const insertarUsuarios = (req, res) => {
    const { usuario, contraseña, correo } = req.body
    const existe = datos.find(d => d.usuario === usuario && d.contraseña === contraseña && d.correo === correo)
    if (existe) {
        res.send('Usuario ya existente')
    }
    else {
        datos.push({ usuario, contraseña, correo })
        res.send('Usuario registrado con éxito')
    }
}
const obtenerUsuarios = (req, res) => {
    res.json(datos)
}
const loguearUsuarios = (req, res) => {
    const { usuario, contraseña } = req.body
    const existe = datos.find(d => d.usuario === usuario && d.contraseña === contraseña)
    if (existe) {
        const {correo} = existe
        const token = gToken()
        existe.token = token
        res.set('token', token)
        res.cookie('token', token)
        res.json({ usuario, contraseña, mensaje: 'Logueado con exito', token, correo })
    } else {
        res.json({ mensaje: 'Usuario o contraseñas incorrectas' })
    }
}

const logout = (req, res) => {
    const token = req.cookies.token;
    const usuario = datos.find(d => d.token === token);
    if (usuario) {
        delete usuario.token
        res.clearCookie('token')
        res.send('Usuario deslogueado')
    } else {
        res.status(401).send('Acceso no autorizado')
    }
}

export default { insertarUsuarios, obtenerUsuarios, loguearUsuarios, logout }