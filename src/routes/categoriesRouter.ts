import express from "express";
import CategoriesController from "../controllers/categories/Categories.controller";

const categoriesRouter = express.Router();

categoriesRouter.get("/categories", CategoriesController.listCategory);
categoriesRouter.post("/categories", CategoriesController.storeCategory);
categoriesRouter.get(
  "/categories/:category",
  CategoriesController.showCategory
);

export default categoriesRouter;
