import { Router } from "express";
import { UsersController } from "../controllers/users.js";
import passport from "passport";
import { requireAuth } from "../middlewares/require-auth.js";

export const CreateUsersRouter = ({ userModel }) => {
  const router = Router();
  const usersController = new UsersController({ userModel });

  router.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] }),
  );

  router.get(
    "/google/callback",
    passport.authenticate("google", {
      session: false,
      failureRedirect: "/login",
    }),
    usersController.googleCallback,
  );

  router.post("/google/callback", usersController.googleOneTap);
  router.get("/me", requireAuth, usersController.me);
  router.post("/register", usersController.register);
  router.post("/login", usersController.login);
  router.post("/logout", requireAuth, usersController.logout);
  router.post("/submission", requireAuth, usersController.submission);

  return router;
};
