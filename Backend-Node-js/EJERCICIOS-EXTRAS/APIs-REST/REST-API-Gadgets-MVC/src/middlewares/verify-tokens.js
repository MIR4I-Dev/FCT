import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export const verifyToken = (req, res, next) => {
  req.session = { user: null };
  // res locals se encarga de mandar los datos a las vistas ejs sin necesidad de pasar el req.session.users manualmente a cada ruta
  res.locals.user = null;

  const token = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  if (!token && !refreshToken) return next();

  if (token) {
    try {
      const data = jwt.verify(token, JWT_SECRET);
      req.session.user = data;
      res.locals.user = data; // <--- Vital para EJS
      return next();
    } catch (e) {
      if (!refreshToken) {
        res.clearCookie("access_token");
        return next();
      }
    }
  }

  // 3. Intentar validar Refresh Token (si el access falló o no existía)
  if (refreshToken) {
    try {
      const data = jwt.verify(refreshToken, JWT_SECRET);

      // Generar nuevo Access Token
      const newAccessToken = jwt.sign(
        { id: data.id, username: data.username },
        JWT_SECRET,
        { expiresIn: "15m" },
      );

      res.cookie("access_token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });

      req.session.user = data;
      res.locals.user = data;
      return next();
    } catch (err) {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      return next();
    }
  }

  next();
};
