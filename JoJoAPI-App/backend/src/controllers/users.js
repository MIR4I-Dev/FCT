import { validateUserLogin, validateUserRegister, validateSubmission } from "../schemas/users.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export class UsersController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  register = async (req, res) => {
    const result = validateUserRegister(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues });
    }
    const { username, email, password } = result.data;
    try {
      const user = await this.userModel.create({ username, email, password });
      if (!user) return res.status(409).json({ error: "Usuario ya existe" });
      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  login = async (req, res) => {
    const result = validateUserLogin(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues });
    }
    const { email, password } = result.data;
    try {
      const user = await this.userModel.login({ email, password });
      if (!user)
        return res.status(401).json({ error: "Correo o contraseña incorrectos, si no tienes una cuenta, regístrate o inicia sesión con Google." });
      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "15m" },
      );
      const refreshToken = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "30d" },
      );

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        })
        .cookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ user, message: "Login exitoso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  googleCallback = async (req, res) => {
    const { id, email } = req.user;
    const token = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id, email }, JWT_SECRET, {
      expiresIn: "30d",
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .redirect("http://localhost:5173/stands");
  };

  logout = (req, res) => {
    res
      .clearCookie("access_token")
      .clearCookie("refresh_token")
      .json({ message: "Logout exitoso" });
  };

  submission = async (req, res) => {
    const email = req.user.email;
    const result = validateSubmission({ email, description: req.body.description });
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues });
    }
    const { description } = result.data;
    try {
      const user = await this.userModel.postSubmission({ email, description });
      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
      res.status(200).json({ message: "Sugerencia enviada exitosamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
