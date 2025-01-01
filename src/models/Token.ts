import mongoose from "mongoose";

const APITokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    deviceId: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Token", APITokenSchema);
