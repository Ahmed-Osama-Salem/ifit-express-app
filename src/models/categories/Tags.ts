import mongoose from "mongoose";

const TagsSchema = new mongoose.Schema({
  name: String,
  type: String,
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
  ],
});

export default mongoose.model("Tags", TagsSchema);
