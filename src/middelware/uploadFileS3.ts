import { NextFunction, Request, Response } from "express";
import parsefile from "../controllers/uploadFilesToS3";

const uploadFileS3 = async (req: any, res: Response, next: NextFunction) => {
  try {
    await parsefile(req)
      .then((data: any) => {
        req.fileData = { data: { url: data.Location, file: data.Key } };
        // res.status(200).json({
        //   data,
        // });
        next();
      })
      .catch((error) => {
        console.log(error);
        return res.status(error.status || 400).json({
          error,
        });
      });
  } catch (err) {
    console.log("====================================");
    console.log(err);
    console.log("====================================");
    res.status(500).json({ message: "server error 44" });
  }
};

export default uploadFileS3;
