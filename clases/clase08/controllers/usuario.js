let usuarios = [
    { user: 'admin', password: 'admin' }
]

function validarUsuario(req, res, next) {
    // let token = req.get('token');
    let token = req.cookies.token;
    
    let usuario = usuarios.find(u => u.token === token);

    if (usuario) {
        req.usuario = usuario;
        next();
        console.log("Token en RES", res.get('token'))
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
    let { user, password } = req.body // Era JSON porque 
    // app.use(express.json())

    if (!user || !password) {
        res.status(400).send('Faltan datos');
    } else {

        let existe = usuarios.find(u => u.user === user);
        if (existe) {
            res.status(402)
            res.send("El usuario ya existe")
        } else {
            usuarios.push({ user, password })
            res.send('Usuario registrado >' + user + ":" + password);
        }
    }
}

const loginUsuario = (req, res) => {
    let { user, password } = req.body

    if (!user || !password) {
        res.status(400).send('Faltan datos');
    } else {
        let usuario = usuarios.find(u => u.user === user && u.password === password);
        if (usuario) {
            // res.send('Usuario logueado >' + user + ":" + password );
            let token = generarToken();
            usuario.token = token;
            res.set('token', token) //Envia el token
            res.cookie('token', token) //Guarda el token en la cookie
            res.status(201).send("usuario logeado");
        } else {
            res.status(401).send('Usuario o contraseña incorrectos');
        }
    }
}

const logoutUsuario = (req, res) => {
    let usuario = req.usuario

    delete usuario.token
    res.send('Usuario deslogueado');
}

const getInfo = (req, res) => {
    let usuario = req.usuario
    res.send('Información sensible');
}

export default { validarUsuario, getUsuarios, registrarUsuario, loginUsuario, logoutUsuario, getInfo }