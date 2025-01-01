import express from "express";
import TagsController from "../controllers/categories/Tags.controller";
// import uploadFileS3 from "../middelware/uploadFileS3";

const tagsRouter = express.Router();

tagsRouter.get("/tags", TagsController.listTag);
tagsRouter.post("/tags/:slug/create", TagsController.storeTag);

export default tagsRouter;
