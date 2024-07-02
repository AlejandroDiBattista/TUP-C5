let datos = [
    { user: 'admin', password: 'admin' },
]
const generarToken = () => {
    return Math.random().toString().substring(2)
}



export const login = async (req, res) => {
    try {
        const { user, password } = req.body
        console.log('Request body:', req.body)
        const buscarUsuario = datos.find((datos) => datos.user === user && datos.password === password)
        if (!buscarUsuario) {
            console.log('Usuario o contraseña incorrecta')
            return res.status(401).json({ message: 'Usuario o contraseña incorrecta' })
        }
        const token = generarToken()
        buscarUsuario.token = token

        res.cookie('token', token, { httpOnly: true, MaxAge: 100 })
        console.log('Login successful:', { user, token })
        res.status(200).json({ user, token })

    }
    catch (error){
        console.error('Error en el login:', error)
        res.status(500).json({message: 'Error interno del servidor'})
    }

}

export async function register(req, res) {
    const { user, password } = req.body

    if (!user || !password) {
        res.status(400).json('Faltan datos')
    } else {

        const existe = datos.find(u => u.user === user)
        if (existe) {
            res.status(409).json("El usuario ya existe")
        } else {
            datos.push({ user: user, password: password })
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
        req.user = usuario;
        next();
    } else {
        res.clearCookie('token')
        res.status(401).send('Acceso no autorizado');
    }
}

export const getInfo = (req, res) => {
    let usuario = req.user
    res.send('Información sensible');
}



