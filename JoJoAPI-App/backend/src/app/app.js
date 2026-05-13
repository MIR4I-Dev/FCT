import express, { json } from "express";
import { CreateStandRouter } from "../routes/stands.js";
import { corsMiddleware } from "../middlewares/cors.js";
import { verifyToken } from "../middlewares/verify-tokens.js";
import { CreateUsersRouter } from "../routes/users.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import "../config/auth-strategies.js";

export const createApp = ({ standModel, userModel }) => {
    const app = express();

    app.use(passport.initialize());
    app.use(json());
    app.use(cookieParser());
    app.use(corsMiddleware());
    app.disable("x-powered-by");
    app.use(verifyToken);

    app.get("/", (req, res) => res.redirect("/stands"));

    app.use("/stands", CreateStandRouter({ standModel }));
    app.use("/users", CreateUsersRouter({ userModel }));



    app.use((req, res) => {
        res.status(404).json({
            error: "Not Found",
            message: `La ruta ${req.url} no existe en este servidor.`,
        });
    });
    return app;
};
