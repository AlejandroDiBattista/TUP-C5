const users = [
  {
    user: "admin",
    password: "admin",
    fone: 3816338435,
    email: "admin@example.com",
  },
];

const generateToken = () => {
  return Math.random().toString().substring(2);
};

const mostrarDatos = (req, res) => {
  res.json(users);
};

const login = (req, res) => {
  const { user, password } = req.body;

  const userLogin = users.find(
    (u) => u.user === user && u.password === password
  );

  if (userLogin) {
    const token = generateToken();
    userLogin.token = token;
    res.set("token", token);
    res.cookie("token", token, { httpOnly: true, MaxAge: 100 });
    res.json({ me: "User logged in" });
  } else {
    res.json({ me: "User or password incorrect" });
  }
};

const logout = (req, res) => {
  const token = req.cookies.token;
  if (token) {
      const user = users.find((u) => u.token === token);
      if (user) {
        user.token = null;
        res.clearCookie("token", { httpOnly: true });
        res.status(202).json({ me: "User logged out" });
      } else {
        res.status(401).json({ me: "User not found or already logged out" });
      }
  }
  else{
    res.status(401).json({ me: "User not found or already logged out" });
  }
};
const register = (req, res) => {
  const { user, password, fone, email } = req.body;
  const userExist = users.find((u) => u.user === user);
  console.log(userExist);
  if (userExist) {
    res.status(404).json({ me: "User existend" });
  } else {
    users.push({ user: user, password: password, fone: fone, email: email });
    res.status(201).json({ me: "User registered successfully" });
  }
};

const validation = (req, res) => {
  const token = req.cookies.token;

  if(token){
      const validation = users.find((u) => u.token === token);
      const { user, password, fone, email } = validation;
        res
          .status(200)
          .json({
            token: token,
            user: user,
            password: password,
            fone: fone,
            email: email,
            me: "ok",
          });
  }
  else{
    res.status(404).json({ me: "error" });
  }

};

export default { login, logout, register, validation, mostrarDatos };
