import express, { json } from "express";
import { CreateGadgetRouter } from "../routes/gadgets.js";
import { corsMiddleware } from "../middlewares/cors.js";
import { findAvailablePort } from "../logic/free-port.js";
import { verifyToken } from "../middlewares/verify-tokens.js";
import { requireAuth } from "../middlewares/require-auth.js";
import { CreateUsersRouter } from "../routes/users.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import "../config/auth-strategies.js";
import { PORT } from "../config/config.js";

export const createApp = ({ gadgetModel, userModel }) => {
  const app = express();

  app.use(passport.initialize());
  app.use(json());
  app.use(cookieParser());
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
  app.use(corsMiddleware());
  app.disable("x-powered-by");
  app.use(verifyToken);

  app.use("/gadgets", requireAuth, CreateGadgetRouter({ gadgetModel }));
  app.get("/protected", requireAuth, (req, res) => {
    res.render("protected");
  });

  app.use("/users", CreateUsersRouter({ userModel }));

  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/register", (req, res) => {
    res.render("register");
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.use((req, res) => {
    res.status(404).json({
      error: "Not Found",
      message: `La ruta ${req.url} no existe en este servidor.`,
    });
  });

  findAvailablePort(PORT).then((port) => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  });

  return app;
};
