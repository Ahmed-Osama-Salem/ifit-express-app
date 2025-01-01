import express from "express";
import handleCheck from "../controllers/checkController";

const checkRouter = express.Router();

checkRouter.get("/check", handleCheck);

export { checkRouter };
