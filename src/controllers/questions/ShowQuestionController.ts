import { Request, Response } from "express";
import Question from "../../models/Question";
import User from "../../models/User";
import handleResponseBody, { StatusCode } from "../../utils/HandleResponse";
const ShowQuestionController = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const question = await Question.findOne({ slug: slug });
  return res.status(StatusCode.Success).json({
    message: "",
    data: {
      questions: question,
    },
    status: StatusCode.Success,
    success: true,
  });
};

export default ShowQuestionController;
