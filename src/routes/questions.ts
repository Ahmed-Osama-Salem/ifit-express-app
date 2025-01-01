import express from "express";
import handleSubmitQuestion from "../controllers/questions/CreateQuestionsController";
import handleSubmitAnswer from "../controllers/questions/SubmitAnswerController";
import ListQuestionController from "../controllers/questions/ListQuestionController";
import ShowQuestionController from "../controllers/questions/ShowQuestionController";
const questionRouter = express.Router();

questionRouter.get("/question", ListQuestionController);
questionRouter.get("/question/:slug", ShowQuestionController);
questionRouter.post("/question", handleSubmitQuestion);
questionRouter.post("/question/:slug", handleSubmitAnswer);
questionRouter.post("/question/:slug/answer", handleSubmitAnswer);

export { questionRouter };
