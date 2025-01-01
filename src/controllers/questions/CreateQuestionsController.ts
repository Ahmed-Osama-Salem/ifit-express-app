import { Request, Response } from "express";
import Question from "../../models/Question";
import User from "../../models/User";
import handleResponseBody, { StatusCode } from "../../utils/HandleResponse";
const handleSubmitQuestion = async (req: Request, res: Response) => {
  const { author, title, content } = req.body;
  const fields: Record<string, any> = {
    author: author,
    title: title,
    content: content,
  };
  const missingFields = Object.keys(fields).filter(
    (i) => fields[i] === undefined
  );

  if (missingFields.length > 0) {
    return res.status(StatusCode.Validation).json(
      handleResponseBody({
        message: `The following fields are required: ${missingFields.join(
          " "
        )}`,
        data: {},
        status: StatusCode.Validation,
        success: false,
      })
    );
  }

  const createQuestion = await Question.create({ author, title, content });
  const id = author;
  const addQuestionToUser = await User.findOneAndUpdate(
    { _id: id },
    { $push: { questions: createQuestion._id } },
    { new: true }
  );

  return res.status(StatusCode.Success).json(
    handleResponseBody({
      message: "Question created and witing for review",
      data: {
        question: createQuestion,
      },
      status: StatusCode.Success,
      success: true,
    })
  );
};

export default handleSubmitQuestion;
