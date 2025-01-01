import express from "express";
import parsefile from "../controllers/uploadFilesToS3";

const uploadFilesRouter = express.Router();

uploadFilesRouter.post("/api/upload", async (req, res) => {
  await parsefile(req)
    .then((data) => {
      return res.status(200).json({
        data,
      });
    })
    .catch((error) => {
      return res.status(error.status || 400).json({
        error,
      });
    });
});

export default uploadFilesRouter;
