import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required."] },
    slug: { type: String },
    description: { type: String, required: [true, "description is required."] },
    content: { type: String, required: [true, "Content is required."] },
    author: { type: String, required: [true, "Author is required."] },
    thumbnail: { type: String, default: null },
    images: { type: String, default: null },
    number_of_views: { type: Number, default: 0 },
    number_of_comments: { type: Number, default: 0 },
    category: { type: Array, default: null },
    tags: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tags",
        },
      ],
      // required: [true, "At least one tag is required."],
    },
    helpful: { type: Boolean, default: false },
    publish: { type: Boolean, default: false },
    date: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Artical", PostSchema);
