import { validateUser } from "../schemas/users.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export class UsersController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  register = async (req, res) => {
    const result = validateUser(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues });
    }
    const { username, password } = result.data;
    try {
      const id = await this.userModel.create({ username, password });
      if (!id) return res.status(409).json({ error: "Usuario ya existe" });
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  login = async (req, res) => {
    const result = validateUser(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues });
    }
    const { username, password } = result.data;
    try {
      const user = await this.userModel.login({ username, password });
      if (!user)
        return res
          .status(401)
          .json({ error: "Usuario o contraseña incorrectos" });
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "15m" },
      );
      const refreshToken = jwt.sign(
        { id: user.id, username: user.username },
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

  logout = (req, res) => {
    res
      .clearCookie("access_token")
      .clearCookie("refresh_token")
      .status(200)
      .json({ message: "Logout exitoso" });
  };
}
