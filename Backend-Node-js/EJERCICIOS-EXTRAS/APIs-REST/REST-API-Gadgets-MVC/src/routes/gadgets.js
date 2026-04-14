import { Router } from "express";
import { GadgetController } from "../controllers/gadgets.js";

export const CreateGadgetRouter = ({ gadgetModel }) => {
  const router = Router();
  const gadgetController = new GadgetController({ gadgetModel });

  router.get("/", gadgetController.getAllGadgets);
  router.get("/:id", gadgetController.getGadgetById);
  router.post("/", gadgetController.createGadget);
  router.patch("/:id", gadgetController.updateGadget);
  router.delete("/:id", gadgetController.deleteGadget);

  return router;
};
