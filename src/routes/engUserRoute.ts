import express from "express";
import handleCreateNewEngUser from "../controllers/engUser/EngUserController";
const engUser = express.Router();

engUser.post("/users/eng", handleCreateNewEngUser);

export { engUser };
