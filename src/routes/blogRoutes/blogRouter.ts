import express from "express";
import blogController from "../../controllers/blog/blog.controller";
import uploadFileS3 from "../../middelware/uploadFileS3";
const blogRouter = express.Router();

blogRouter.get("/posts", blogController.listPost);
blogRouter.post("/posts/create", uploadFileS3, blogController.storePost);
blogRouter.get("/posts/:slug", blogController.showPost);

export default blogRouter;
