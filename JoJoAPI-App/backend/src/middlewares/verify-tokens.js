import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export const verifyToken = (req, res, next) => {
  req.session = { user: null };

  const token = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  if (!token && !refreshToken) return next();

  if (token) {
    try {
      const data = jwt.verify(token, JWT_SECRET);
      req.user = data;
      return next();
    } catch (e) {
      if (!refreshToken) {
        res.clearCookie("access_token");
        return next();
      }
    }
  }

  if (refreshToken) {
    try {
      const data = jwt.verify(refreshToken, JWT_SECRET);

      const newAccessToken = jwt.sign(
        { id: data.id, email: data.email, username: data.username },
        JWT_SECRET,
        { expiresIn: "15m" },
      );

      res.cookie("access_token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 15 * 60 * 1000,
      });

      req.user = data;
      return next();
    } catch (err) {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      return next();
    }
  }

  next();
};
