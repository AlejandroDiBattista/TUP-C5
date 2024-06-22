let usuarios = [
]

const creadId = () => {
    return usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1
}

const generarToken = () => {
    return Math.random().toString().substring(2);
}

const obtenerUsuarios = (req, res) => {
    res.status(201).json(usuarios)
}

const validarUsuario = (req, res, next) => {
    let token = req.cookies.token

    const usuario = usuarios.find(u => u.token == token)
    if(usuario) {
        req.usuario = usuario
        next()
    }
    else {
        res.status(403).send('Usted no tiene acceso')
    }
}

const registrarUsuario = (req, res) => {
    let {usuario, correo, contraseña} = req.body
    const nuevoUsuario = {id: creadId(), usuario, correo, contraseña}

    if (!usuario || !contraseña) {
        return  res.status(401).send('Faltan datos')
    }
    else {
        let existe = usuarios.find(u => u.usuario === usuario && u.correo === correo)
        if(existe) {
            return  res.status(401).send('El usuario o el correo ya existe')
        }
        else {
            usuarios.push(nuevoUsuario)
            return  res.status(201).send('Usuario registrado con exito')
        }
    }
}

const loginUsuario = (req, res) => {
    let {usuario, contraseña} = req.body
    let existe = usuarios.find(u => u.usuario === usuario && u.contraseña === contraseña)
    if(existe) {
        let token = generarToken()
        existe.token = token
        res.cookie('token', token)
        res.status(201).json({datos:existe,mensaje:'Usuario logueado'})
    }
    else {
        res.status(401)
        res.json({mensaje:'Usuario y/o contraseña incorrectos'})
    }
}

const logoutUsuario = (req, res) => {
    const usuario = req.usuario
    res.clearCookie('token')
    res.send('Usuario deslogueado')
}

const obtenerInfo = (req, res) => {
    const usuario = req.usuario
    res.send('Información sensible')
}


export default {validarUsuario ,obtenerUsuarios, registrarUsuario, loginUsuario, logoutUsuario, obtenerInfo}