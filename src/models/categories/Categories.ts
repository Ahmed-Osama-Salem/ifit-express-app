import mongoose from "mongoose";

//  {
//     category: "civil eng",
//     tags: {
//       tanfiz: {
//         id: "1",
//         type: "tnfiz",
//       },
//       tsmaim: {
//         id: "2",
//         type: "tsmaim",
//       },
//     },
//   },

const CategoriesSchema = new mongoose.Schema({
  category: String,
  slug: String,
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tags",
    },
  ],
});

export default mongoose.model("Categories", CategoriesSchema);
