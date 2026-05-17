import { validateUserLogin, validateUserRegister, validateSubmission } from "../schemas/users.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, GOOGLE_CLIENT_ID } from "../config/config.js";
import { OAuth2Client } from "google-auth-library";

export class UsersController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  register = async (req, res) => {
    const result = validateUserRegister(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues });
    }
    const { username, email, password } = result.data;
    try {
      const user = await this.userModel.create({ username, email, password });
      if (!user) return res.status(409).json({ error: "User already exists" });
      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  login = async (req, res) => {
    const result = validateUserLogin(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues });
    }
    const { email, password } = result.data;
    try {
      const user = await this.userModel.login({ email, password });
      if (!user)
        return res.status(401).json({ error: "Incorrect email or password, if you don't have an account, register or log in with Google." });
      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        JWT_SECRET,
        { expiresIn: "15m" },
      );
      const refreshToken = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        JWT_SECRET,
        { expiresIn: "30d" },
      );

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        })
        .cookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ user, message: "Login successful" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  googleCallback = async (req, res) => {
    const { id, email, username } = req.user;
    const token = jwt.sign({ id, email, username }, JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id, email, username }, JWT_SECRET, {
      expiresIn: "30d",
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .json({ user: req.user, message: "Google login successful" });
  };

  googleOneTap = async (req, res) => {
    const { token: googleToken } = req.body;
    if (!googleToken) return res.status(400).json({ error: "Missing Google token" });

    try {
      const client = new OAuth2Client(GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const { sub: provider_id, email, name } = payload;
      const username = name || email.split("@")[0];

      const user = await this.userModel.findOrCreate({ username, email, provider: "google", provider_id });
      if (!user) return res.status(500).json({ error: "Error creating user" });

      const accessToken = jwt.sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET, { expiresIn: "15m" });
      const refreshToken = jwt.sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET, { expiresIn: "30d" });

      res
        .cookie("access_token", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        })
        .cookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ user, message: "Google login successful" });
    } catch (error) {
      res.status(401).json({ error: "Invalid Google token" });
    }
  };

  logout = (req, res) => {
    res
      .clearCookie("access_token")
      .clearCookie("refresh_token")
      .json({ message: "Logout successful" });
  };

  submission = async (req, res) => {
    const email = req.user.email;
    const result = validateSubmission({ email, description: req.body.description });
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues });
    }
    const { description } = result.data;
    try {
      const user = await this.userModel.postSubmission({ email, description });
      if (!user) return res.status(404).json({ error: "User not found" });
      res.status(200).json({ message: "Submission sent successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  me = (req, res) => {
    // No necesito usar el modelo porque el middleware verifyToken ya adjunta el usuario a req.user
    res.json({ user: req.user });
  };

}
