import mongoose from "mongoose";
const slugify = require("slugify");

const questionSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    slug: {
      type: String,
    },
    content: {
      type: String,
    },
    images: {
      type: [{ id: Number, type: String }],
    },
    status: {
      type: String,
      enum: ["approved", "pending", "disapproved"],
      default: "pending",
    },
    is_answered: {
      type: Boolean,
      default: false,
    },
    answer: {
      type: String,
    },
    eng_answered: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EngUser",
    },
    voted: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
questionSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true });
  }
  next();
});

export default mongoose.model("Question", questionSchema);
