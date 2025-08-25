import express from "express";
import {
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/details").get(authMiddleware, getUserDetails);
authRouter.get("/logout", authMiddleware, logoutUser);

export default authRouter;
