let usuarios = [];

const CrearID = () => {
    return usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
}

const GenerarToken = () => {
    return Math.random().toString().substring(2);
}

const validarUsuarios = (req, res, next) => {
    let token = req.cookies.token;
    const usuario = usuarios.find(u => u.token == token)
    if (usuario) {
        req.usuario = usuario;
        next();
    }
    else {
        res.status(401).send('No tiene acceso');
    }
}

const ObtenerUsuarios = (req, res) => {
    res.status(200).send(usuarios); 
}

const RegistrarUsuario = (req, res) => {
    const { nombreusuario, correo, contrasena } = req.body;
    const usuarioExiste = usuarios.find(u => u.nombreusuario == nombreusuario || u.correo == correo);
    if (!usuarioExiste) {
        const nuevoUsuario = { id: CrearID(), nombreusuario, correo, contrasena };
        usuarios.push(nuevoUsuario);
        return res.status(200).send("Usuario Registrado");       
    } else { 
        return res.status(400).send("El Usuario ya existe");
    }
}


const LoginUsuario = (req, res) => {
    const { correo, contrasena } = req.body;
    const usuarioExiste = usuarios.find(u => u.correo == correo && u.contrasena == contrasena);
    if (usuarioExiste) {
        const token = GenerarToken();
        res.cookie('token', token)
        usuarioExiste.token = token;
        return res.status(200).send({Usuario:usuarioExiste,message:"Usuario Logueado"});
    } else {
        return res.status(400).send( {message:"Usuario no encontrado, Registrese"});
    }
}


const LogoutUsuario = (req, res) => {
    const usuario = req.usuario;
    delete usuario.token;
    return res.status(200).send('Usuario deslogueado');
} 

const Obtenerinformacion = (req, res) => {
    let usuario = req.usuario
    return res.send('Esta informacion es confidencial, !No compartir');
}



export default { ObtenerUsuarios, RegistrarUsuario, LoginUsuario, LogoutUsuario, validarUsuarios, Obtenerinformacion }


