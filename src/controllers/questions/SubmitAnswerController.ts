import { Request, Response } from "express";
import Question from "../../models/Question";
import User from "../../models/User";
import handleResponseBody, { StatusCode } from "../../utils/HandleResponse";
const handleSubmitAnswer = async (req: Request, res: Response) => {
  const { eng_user, answer } = req.body;
  const fields: Record<string, any> = {
    eng_user: eng_user,
    answer: answer,
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
  const { slug } = req.params;
  const createQuestion = await Question.findOne({ slug: slug });
  if (!createQuestion) {
    return res.status(StatusCode.NotFound).json(
      handleResponseBody({
        message: "Question not found",
        data: {},
        status: StatusCode.NotFound,
        success: true,
      })
    );
  }

  const id = eng_user;
  const updateQuestion = await Question.findOneAndUpdate(
    { slug: slug },
    {
      is_answered: true,
      answer,
    },
    { new: true }
  );
  console.log(updateQuestion);
  //   const addQuestionToUser = await User.findOneAndUpdate(
  //     { _id: id },
  //     { $push: { questions: createQuestion._id } },
  //     { new: true }
  //   );

  return res.status(StatusCode.Success).json(
    handleResponseBody({
      message: "Answer Submitted",
      data: {
        question: updateQuestion,
      },
      status: StatusCode.Success,
      success: true,
    })
  );
};

export default handleSubmitAnswer;
