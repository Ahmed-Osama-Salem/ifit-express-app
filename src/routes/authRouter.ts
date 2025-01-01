import express, { Request } from "express";
import {
  handleIsUserExists,
  handleCreateUserByAdmin,
} from "../controllers/auth/loginController";
// import handleLoginViaSocial from "../controllers/loginController";
const passport = require("passport");

const authRouter = express.Router();

authRouter.post("/auth/login", handleIsUserExists);
authRouter.post("/auth/register/", handleCreateUserByAdmin);

export { authRouter };
