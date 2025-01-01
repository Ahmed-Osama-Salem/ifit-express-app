import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { checkRouter } from "./routes/checkRouter";
import { authRouter } from "./routes/authRouter";
import connectionDB from "./config/DB";
import { oAuthRouter } from "./routes/oAuthToken";
import { engUser } from "./routes/engUserRoute";
import swaggerUi from "swagger-ui-express";
// import * as swaggerDocument from "./../swagger.json";
import { questionRouter } from "./routes/questions";
import blogRouter from "./routes/blogRoutes/blogRouter";
import categoriesRouter from "./routes/categoriesRouter";
import tagsRouter from "./routes/TagsRouter";
import uploadFilesRouter from "./routes/uploadFilesRouter";

const path = require("path");

dotenv.config();
connectionDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use(authRouter);
app.use(checkRouter);
app.use(oAuthRouter);
app.use(engUser);
app.use(questionRouter);
app.use(blogRouter);
app.use(categoriesRouter);
app.use(tagsRouter);

app.get("/testupload", (req: Request, res: Response) => {
  res.send(`
  <h2>File Upload With <code>"Node.js"</code></h2>
  <form action="/api/upload" enctype="multipart/form-data" method="post">
  <div>Select a file: 
  <input type="file" name="file" multiple="multiple" />
  </div>
  <input type="submit" value="Upload" />
  </form>
  `);
});

app.use(uploadFilesRouter);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Default route
app.get("/", async (req: Request, res: Response) => {
  res.status(200).send({ user: "welcome" });
});

// Export the app for Vercel
export default app;
