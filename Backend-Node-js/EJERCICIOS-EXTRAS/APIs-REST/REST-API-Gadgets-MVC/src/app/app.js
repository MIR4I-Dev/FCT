import express, { json } from "express";
import { CreateGadgetRouter } from "../routes/gadgets.js";
import { corsMiddleware } from "../middlewares/cors.js";
import { findAvailablePort } from "../logic/free-port.js";

const PORT = process.env.PORT ?? 3000;

export const createApp = ({ gadgetModel }) => {
  const app = express();
  app.use(json());
  app.use(corsMiddleware());
  app.disable("x-powered-by");
  app.use("/gadgets", CreateGadgetRouter({ gadgetModel }));
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
