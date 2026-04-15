import express from "express";
import { PORT } from "./config.js";
import { UserRepository } from "./user-repository.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { JWT_SECRET } from "./config.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  req.session = { user: null };
  const token = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  if (!token && !refreshToken) return next();

  if (token) {
    try {
      const data = jwt.verify(token, JWT_SECRET);
      req.session.user = data;
      return next();
    } catch {} // Si falla o expira, probamos con el refresh token
  }

  if (refreshToken) {
    try {
      const data = jwt.verify(refreshToken, JWT_SECRET);
      const newAccessToken = jwt.sign(
        { id: data.id, username: data.username },
        JWT_SECRET,
        { expiresIn: "1h" },
      );

      res.cookie("access_token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      });

      req.session.user = data;
    } catch {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
    }
  }

  next();
});

const port = PORT;

app.get("/", (req, res) => {
  if (!req.session.user) return res.render("index");
  res.render("protected", req.session.user); // id y username
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserRepository.login({ username, password });
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" },
    );
    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res
      .cookie("access_token", token, {
        httpOnly: true /*Solo puede accederse desde el servidor*/,
        secure: process.env.NODE_ENV === "production" /*Solo HTTPS*/,
        sameSite: "strict" /*Evita ataques CSRF*/,
        maxAge: 60 * 60 * 1000 /*1 hora de vida*/,
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 /*7 dias de vida*/,
      })
      .status(200)
      .json({ user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Como debe mantenerse el contrato debería tener async await y devolver la id en repo y aquí recogerla
    const id = await UserRepository.create({ username, password });
    res.status(201).json({ id });
  } catch (error) {
    // NORMALMENTE NO ENVIAMOS ERRORES DE LA BDD
    res.status(400).json({ error: error.message });
  }
});

app.post("/logout", (req, res) => {
  res
    .clearCookie("access_token")
    .clearCookie("refresh_token")
    .json({ message: "Logout successful" });
});

app.get("/protected", (req, res) => {
  const { user } = req.session;
  if (!user) return res.redirect("/"); /*Si no hay token, no está autenticado*/
  res.render("protected", user);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
