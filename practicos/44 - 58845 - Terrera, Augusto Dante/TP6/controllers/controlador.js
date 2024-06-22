let datos = [
    {  usuario: 'admin', password: 'admin' },
]
const generarToken = () => {
    return Math.random().toString().substring(2)
}



export async function login(req, res) {
    const { user, password } = req.body
    const buscarUsuario = datos.find(datos => datos.usuario === user && datos.password === password)
    if (!buscarUsuario) {
        return res.json({ message: 'Usuario o contraseña incorrecta' })
    }
    else {
        const token = generarToken()
        buscarUsuario.token = token
        res.cookie('token', token)
        res.json({ user, token })
    }

}

export const register = (req, res) => {
    const { nombre, apellido, email, user, password } = req.body

    if (!user || !password) {
        res.status(400).json('Faltan datos')
    } else {

        let existe = datos.find(u => u.user === user)
        if (existe) {
            res.status(402)
            res.json("El usuario ya existe")
        } else {
            const newUser = { nombre, apellido, email, user, password }
            datos.push(newUser)
            res.status(201).json({ message: 'Usuario registrado con éxito' })
        }
    }
}

export const logout = (req, res) => {
    const token = req.cookies.token;
    const user = datos.find(d => d.token === token);
    if (user) {
        delete user.token
        res.clearCookie('token')
        res.send('Usuario deslogueado')
    } else {
        res.status(401).send('Acceso no autorizado')
    }
}

export function validarUsuario(req, res, next) {
    let token = req.cookies.token;

    let usuario = datos.find(d => d.token === token);

    if (usuario) {
        req.usuario = usuario;
        next();
        console.log("Token en RES", res.get('token'))
    } else {
        res.status(401).send('Acceso no autorizado');
    }
}

export const getInfo = (req, res) => {
    let usuario = req.usuario
    res.send('Información sensible');
}



