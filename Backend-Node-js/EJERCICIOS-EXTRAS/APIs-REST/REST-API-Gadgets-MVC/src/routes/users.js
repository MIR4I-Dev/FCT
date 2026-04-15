import { Router } from "express";
import { UsersController } from "../controllers/users.js";

export const CreateUsersRouter = ({ userModel }) => {
  const router = Router();
  const usersController = new UsersController({ userModel });

  router.post("/register", usersController.register);
  router.post("/login", usersController.login);
  router.post("/logout", usersController.logout);

  return router;
};
