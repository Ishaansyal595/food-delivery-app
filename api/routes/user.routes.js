import express from "express";
import {
  isAuthUser,
  loginUser,
  logoutUser,
  signUpUser,
} from "../controllers/user.controller.js";
import { authUser } from "../middleware/authUser.js";

const UserRoute = express.Router();

UserRoute.post("/sign-up", signUpUser);

UserRoute.post("/sign-in", loginUser);

UserRoute.get("/logout", authUser, logoutUser);

UserRoute.get("/is-auth", authUser, isAuthUser);

export default UserRoute;
