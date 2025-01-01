import { Request, Response } from "express";
import Question from "../../models/Question";
import User from "../../models/User";
import handleResponseBody, { StatusCode } from "../../utils/HandleResponse";
const ListQuestionController = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;

  const question = await Question.find()
    .limit(Number(limit) * 1)
    .skip((Number(page) - 1) * Number(limit))
    .exec();
  const count = await Question.countDocuments();

  return res.status(StatusCode.Success).json({
    message: "",
    data: {
      questions: question,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: page,
    },
    status: StatusCode.Success,
    success: true,
  });
};

export default ListQuestionController;
