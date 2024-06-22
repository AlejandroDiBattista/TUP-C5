let usuarios = [
    { user: 'admin', password: 'admin', token: null } 
];

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
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
}

const getUsuarios = (req, res) => {
    res.json(usuarios);
}

const registrarUsuario = (req, res) => {
    let { user, password } = req.body;

    if (!user || !password) {
        res.status(400).send('Faltan datos');
    } else {
        let existe = usuarios.find(u => u.user === user);
        if (existe) {
            res.status(402).send("El usuario ya existe");
        } else {
            let token = generarToken();
            usuarios.push({ user, password, token }); 
            res.send(`Usuario registrado: ${user}`);
        }
    }
}

const loginUsuario = (req, res) => {
    let { user, password } = req.body;

    if (!user || !password) {
        res.status(400).send('Faltan datos');
    } else {
        let usuario = usuarios.find(u => u.user === user && u.password === password);
        if (usuario) {
            let token = generarToken();
            usuario.token = token; 
            res.cookie('token', token); 
            res.send('Usuario logeado');
        } else {
            res.status(401).send('Usuario o contraseña incorrectos');
        }
    }
}

const logoutUsuario = (req, res) => {
    res.clearCookie('token'); // Limpiar la cookie del token
    res.status(200).json({ message: 'Usuario deslogueado' });
}



const getInfo = (req, res) => {
    res.send('Información sensible');
}

export default { validarUsuario, getUsuarios, registrarUsuario, loginUsuario, logoutUsuario, getInfo };
