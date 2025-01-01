import { Request, Response } from "express";
import Categories from "../../models/categories/Categories";
import slugify from "slugify";

class CategoriesController {
  async listCategory(req: Request, res: Response) {
    try {
      const allCategories = await Categories.find().populate("tags");
      res.status(200).json({ data: allCategories, success: true, code: 200 });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async storeCategory(req: Request, res: Response) {
    const { category } = req.body;

    const createCategory = new Categories({
      category,
      slug: slugify(category),
    });

    try {
      await createCategory.save();
      res.status(200).json({
        createCategory,
        success: true,
        code: 201,
        message: "Category created",
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async showCategory(req: Request, res: Response) {
    try {
      const category = await Categories.findOne({
        slug: req.params.category,
      }).populate("tags"); // Populate the "tags" field to retrieve the referenced tags

      if (!category) {
        res.status(404).json({
          success: false,
          code: 404,
          message: "Category not found",
        });
        return;
      }

      res.status(200).json({
        data: category,
        success: true,
        code: 200,
        message: "Category retrieved successfully",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new CategoriesController();
