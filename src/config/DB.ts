import mongoose from "mongoose";

const connectionDB = async () => {
  await mongoose
    // .connect("mongodb://127.0.0.1:27017/ifit")
    .connect(
      "mongodb+srv://ahmedosamaweb:BlPUaySvJbsmiKDC@clusterifit.ojf00.mongodb.net/"
    )
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export default connectionDB;

//BlPUaySvJbsmiKDC
//ahmedosamaweb
//197.36.36.247
