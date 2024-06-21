
let usuarios = [
    { usuario: "matias", contraseña: "admin" },
    { usuario: "diego", contraseña: "1234" }
]

function generarToken() {
    return Math.random().toString().substring(2);
}

function validarUsuario(req, res, next) {

    let token = req.cookies.token;
    let usuario = usuarios.find(u => u.token === token);

    if (usuario) {
        req.usuario = usuario;
        next();
    } else {
        res.status(401).send('Acceso no autorizado');
    }
}

const login = (req, res) => {
    const { usuario, contraseña } = req.body;
    const encontrar = usuarios.find(u => u.usuario == usuario && u.contraseña == contraseña);

    if (encontrar) {
        const token = generarToken();
        encontrar.token = token;
        res.cookie('token', token)
        res.json({ usuario, contraseña, mensaje: 'LOGUEADO', token })
    } else {
        res.json({ mensaje: 'Usuario o contraseñas incorrectas' })
    }

}

const info = (req, res) => {
    const token = req.cookies.token;
    const encontrar = usuarios.find(u => u.token === token)

    if (encontrar) {
        res.send('INFO');
    } else {
        res.send({ mensaje: "No coincide" });
    }

}


const logout = (req, res) => {
    const token = req.cookies.token;
    const encontrar = usuarios.find(u => u.token === token)

    if (encontrar) {
        delete encontrar.token
        res.cookie('token', null);
        res.json({ mensaje: "Usuario deslogueado" });
    } else {
        res.json({ mensaje: "No se pudo desloguear" });
    }

}

const registrar = (req, res) => {

    const { usuario, contraseña } = req.body;
    const encontrar = usuarios.find(u => u.usuario == usuario && u.contraseña == contraseña);
    if (encontrar) {
        res.json({ mensaje: 'El usuario ya existe' })
    } else {
        usuarios.push({ usuario, contraseña })
        res.json({ usuario, contraseña, mensaje: 'REGISTRADO' })
    }

}


export default { login, validarUsuario, logout, registrar, info };