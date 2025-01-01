import express from "express";
import {
  handleCreateOAuth,
  handleRefreshOAuth,
  handleVrifyToken,
} from "../controllers/oAuth/oAuthToken";
const oAuthRouter = express.Router();

oAuthRouter.post("/oauth/token", handleCreateOAuth);
oAuthRouter.post("/oauth/token/refresh", handleRefreshOAuth);
oAuthRouter.post("/oauth/token/isvalid", handleVrifyToken);

export { oAuthRouter };
