import { Router } from "express";
import { StandController } from "../controllers/stands.js";

export const CreateStandRouter = ({ standModel }) => {
  const router = Router();
  const standController = new StandController({ standModel });

  router.get("/", standController.getAllStands);

  return router;
};
