import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();
const PORT = 3001;
const users = {}; // Almacenar usuarios temporalmente

app.use(morgan("dev")); // Middleware para logging de solicitudes en consola
app.use(cookieParser()); // Middleware para parsear cookies
app.use(express.json()); // Middleware para parsear JSON en las solicitudes
app.use(express.static("public")); // Middleware para servir archivos estáticos desde la carpeta 'public'

// Middleware para verificar sesión de usuario
const authenticateUser = (req, res, next) => {
  if (req.cookies.user) {
    next();
  } else {
    res
      .status(401)
      .send("Necesita iniciar sesión para acceder a esta información.");
  }
};

// Registro de usuario
app.post("/register", (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Las contraseñas no coinciden." });
  }

  if (users[username]) {
    return res.status(400).json({ message: "Usuario ya registrado." });
  }

  users[username] = { password }; // Almacenar solo la contraseña (ejemplo básico)

  res.cookie("user", username, { httpOnly: true });
  res.status(200).json({ message: "Usuario registrado con éxito." });
});

// Inicio de sesión
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }

  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Credenciales incorrectas." });
  }

  res.cookie("user", username, { httpOnly: true });
  res.status(200).json({ message: "Inicio de sesión exitoso." });
});

// Cierre de sesión
app.post("/logout", (req, res) => {
  res.clearCookie("user");
  res.status(200).json({ message: "Cierre de sesión exitoso." });
});

// Obtener información del usuario
app.get("/info", authenticateUser, (req, res) => {
  res.status(200).json({ message: `Bienvenido ${req.cookies.user}` });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:3001`);
});
