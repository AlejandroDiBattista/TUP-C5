let usuarios = [
    { user: 'admin', password: 'admin' },
    { user: 'mili123', password: 'hola' }
]

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

function generarToken() {
    return Math.random().toString().substring(2);
}

const getUsuarios = (req, res) => {
    res.json(usuarios);
}

const registrarUsuario = (req, res) => {
    let { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).send('Faltan datos');
    }

    let existe = usuarios.find(u => u.user === user);
    if (existe) {
        return res.status(402).send("El usuario ya existe");
    } else {
        usuarios.push({ user, password });
        return res.send('Usuario registrado > ' + user + ":" + password);
    }
}

const loginUsuario = (req, res) => {
    let { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).send('Faltan datos');
    }

    let usuario = usuarios.find(u => u.user === user && u.password === password);
    if (usuario) {
        let token = generarToken();
        usuario.token = token;
        res.cookie('token', token, { httpOnly: true });// Verificar
        return res.send("Usuario logueado");
    } else {
        return res.status(401).send('Usuario o contraseña incorrectos');
    }
}

const logoutUsuario = (req, res) => {
    let usuario = req.usuario;
    delete usuario.token;
    
    res.send('Usuario deslogueado');
}

const getInfo = (req, res) => {
    let usuario = req.usuario;
    res.send('¡Hola,bienvenido!');
}

export default { validarUsuario, getUsuarios, registrarUsuario, loginUsuario, logoutUsuario, getInfo };
