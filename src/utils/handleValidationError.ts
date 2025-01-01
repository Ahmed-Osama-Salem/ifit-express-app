import { Response } from "express";

const handleValidationError = (err: any, res: Response) => {
  const validationErrors: Record<string, string> = {};
  Object.keys(err.errors).forEach((field) => {
    validationErrors[field] = err.errors[field].message;
  });

  return res.status(422).json({
    errors: validationErrors,
    code: 422,
    success: false,
  });
};

export default handleValidationError;
