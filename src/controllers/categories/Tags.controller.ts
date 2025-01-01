import { Request, Response } from "express";
import Tags from "../../models/categories/Tags";
import Categories from "../../models/categories/Categories";

class TagsController {
  async listTag(req: Request, res: Response) {
    try {
      const posts = await Tags.find();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async storeTag(req: Request, res: Response) {
    const { name, type } = req.body;
    const { slug } = req.params;

    try {
      const category = await Categories.findOne({ slug: slug });

      if (!category) {
        res.status(404).json({
          success: false,
          code: 404,
          message: "Category not found",
        });
        return;
      }

      const createTag = new Tags({
        name,
        type,
        category: category._id,
      });

      await createTag.save();

      await Categories.findByIdAndUpdate(
        category._id,
        { $push: { tags: createTag._id } },
        { new: true }
      );

      res.status(201).json({
        data: createTag,
        success: true,
        code: 201,
        message: "Tag created",
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

export default new TagsController();
