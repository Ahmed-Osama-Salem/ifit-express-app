import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      unique: [true, "Phone number have to be uniq"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email have to be uniq"],
    },
    passcode: {
      type: String,
      unique: [true, "Passcode have to be uniq"],
    },
    image: {
      type: String,
    },
    token: {
      type: String,
    },
    favorite: {
      type: [{ id: Number, type: String }],
    },
    provider: {
      type: String,
      enum: ["facebook", "email", "google"],
    },
    questions: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
