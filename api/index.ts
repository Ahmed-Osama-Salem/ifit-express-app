import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { checkRouter } from "../src/routes/checkRouter";
import { authRouter } from "../src/routes/authRouter";
import connectionDB from "../src/config/DB";
import { oAuthRouter } from "../src/routes/oAuthToken";
import { engUser } from "../src/routes/engUserRoute";
import swaggerUi from "swagger-ui-express";
// import * as swaggerDocument from "./../swagger.json";
import { questionRouter } from "../src/routes/questions";
import blogRouter from "../src/routes/blogRoutes/blogRouter";
import categoriesRouter from "../src/routes/categoriesRouter";
import tagsRouter from "../src/routes/TagsRouter";
import uploadFilesRouter from "../src/routes/uploadFilesRouter";

const path = require("path");

dotenv.config();
connectionDB();

const app = express();

const PORT = process.env.PORT || 3000;

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

// app.get("/testupload", (req: Request, res: Response) => {
//   res.send(`
//   <h2>File Upload With <code>"Node.js"</code></h2>
//   <form action="/api/upload" enctype="multipart/form-data" method="post">
//   <div>Select a file:
//   <input type="file" name="file" multiple="multiple" />
//   </div>
//   <input type="submit" value="Upload" />
//   </form>
//   `);
// });

// app.use(uploadFilesRouter);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Default route
app.get("/", async (req: Request, res: Response) => {
  res.status(200).send({ user: "welcome" });
});

app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));

// Export the app for Vercel
export default app;
