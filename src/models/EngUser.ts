import mongoose from "mongoose";

const validRoles = [
  "can_write_blog",
  "can_answer",
  "can_create_user",
  "customer_support",
  "supuer_eng",
];

const EngUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email has to be unique"],
    },
    token: {
      type: String,
    },
    profile_image: {
      type: String,
    },
    permissions: [
      {
        role: {
          type: String,
          enum: validRoles,
          required: [true, "Role is required"],
          validate: {
            validator: function (value: any) {
              return validRoles.includes(value);
            },
            message: "Invalid role",
          },
        },
        checked: {
          type: Boolean,
          default: false,
        },
      },
    ],
    articles: {
      type: [Number],
    },
    questions_answered: {
      type: [Number],
    },
    verified: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("EngUser", EngUserSchema);
