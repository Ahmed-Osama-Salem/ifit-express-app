import { Request, Response } from "express";
import Posts from "../../models/Blog";
import handleValidationError from "../../utils/handleValidationError";
import slugify from "slugify";
import Tags from "../../models/categories/Tags";
class BlogController {
  async listPost(req: Request, res: Response) {
    const { page = 1, limit = 10 } = req.query;

    try {
      const posts = await Posts.find()
        .populate("tags")
        .limit(Number(limit) * 1)
        .skip((Number(page) - 1) * Number(limit))
        .exec();

      const count = await Posts.countDocuments();

      res.status(200).json({
        message: "page" + " " + page,
        data: {
          posts: posts,
          totalPages: Math.ceil(count / Number(limit)),
          currentPage: Number(page),
        },
        status: 200,
        success: true,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async storePost(req: Request | any, res: Response) {
    const image = req.fileData;
    const {
      title,
      description,
      content,
      author,
      thumbnail,
      number_of_views,
      number_of_comments,
      category,
      tags,
      helpful,
      publish,
      date,
    } = req.body;

    // Check if tags are not provided in the request
    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return res.status(422).json({
        message: "Tags are required.",
        success: false,
        code: 422,
      });
    }

    try {
      // Find or create tags before creating the post
      const tagObjects = await Promise.all(
        tags &&
          tags.map(async (tag: string) => {
            const existingTag = await Tags.findOne({ name: tag });
            if (existingTag) {
              return existingTag;
            } else {
              const newTag = new Tags({ name: tag });
              await newTag.save();
              return newTag;
            }
          })
      );

      const createNewPost = new Posts({
        title,
        slug: slugify(title),
        description,
        content,
        author,
        thumbnail: image.data.url,
        number_of_views,
        number_of_comments,
        category,
        tags: tagObjects.map((tag) => tag._id),
        helpful,
        publish,
        date: new Date(),
      });

      await createNewPost.save();

      res.status(201).json({
        message: "Post created",
        post: createNewPost,
        success: true,
        code: 201,
      });
    } catch (err: any) {
      if (err.name === "ValidationError") {
        handleValidationError(err, res);
      } else {
        res.status(500).json({ message: "Server Error" });
      }
    }
  }

  async showPost(req: Request, res: Response) {
    const { slug } = req.params;

    try {
      const post = await Posts.findOne({ slug: slug }).populate("tags");

      return res.status(200).json({
        data: {
          post: post,
        },
        status: 200,
        success: true,
      });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  }
}

export default new BlogController();
