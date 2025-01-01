import { Request, Response } from "express";
import User from "../../models/User";
import handleResponseBody, { StatusCode } from "../../utils/HandleResponse";
import { JwtGenerator } from "../../utils/JwtGenerator";
import HashingService from "../../utils/Hashing";
const validator = require("email-validator");
const jwtToken = new JwtGenerator();
const hashing = new HashingService();
const handleIsUserExists = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(StatusCode.Validation).json(
      handleResponseBody({
        message: "You have to send email field",
        data: {},
        status: StatusCode.Validation,
        success: false,
      })
    );
  }
  if (!validator.validate(email)) {
    return res.status(StatusCode.Validation).json(
      handleResponseBody({
        message: "You have to enter a valid email",
        data: {},
        status: StatusCode.Validation,
        success: false,
      })
    );
  }
  const findUser = await User.findOne({ email });
  if (!findUser) {
    return res.status(StatusCode.NotFound).json(
      handleResponseBody({
        message: "User Not Found",
        data: {},
        status: StatusCode.NotFound,
        success: false,
      })
    );
  }
  const isPasswordCorrect = hashing.BCryptComper(
    password,
    findUser.password as string
  );

  if (!isPasswordCorrect) {
    return res.status(StatusCode.Validation).json(
      handleResponseBody({
        message: "You have enterd worng creds",
        data: {},
        status: StatusCode.Validation,
        success: false,
      })
    );
  }
  if (isPasswordCorrect) {
    return res.status(StatusCode.Success).json(
      handleResponseBody({
        message: "Welcome Back" + " " + email,
        data: {
          user: {
            email: findUser.email,
            phone: findUser.phone,
            token: findUser.token,
            qustions: findUser.questions,
            favorits: findUser.favorite,
          },
        },
        status: StatusCode.Success,
        success: true,
      })
    );
  }
};

// const handleRegister = async (req: Request, res: Response) => {
//   const { email, password, passcode } = req.body;
//   const isUserHasPasscode = await User.findOne({ passcode });
//   const fields: Record<string, any> = {
//     email: email,
//     password: password,
//     passcode: passcode,
//   };
//   const missingFields = Object.keys(fields).filter(
//     (i) => fields[i] === undefined
//   );

//   if (missingFields.length > 0) {
//     return res.status(StatusCode.Validation).json(
//       handleResponseBody({
//         message: `The following fields are required: ${missingFields.join(
//           " "
//         )}`,
//         data: {},
//         status: StatusCode.Validation,
//         success: false,
//       })
//     );
//   }

//   if (!isUserHasPasscode) {
//     return res.status(StatusCode.Validation).json(
//       handleResponseBody({
//         message: "You have entered a not valid passcode",
//         data: {},
//         status: StatusCode.Validation,
//         success: false,
//       })
//     );
//   }
//   if (!validator.validate(email)) {
//     return res.status(StatusCode.Validation).json(
//       handleResponseBody({
//         message: "You have to enter a valid email",
//         data: {},
//         status: StatusCode.Validation,
//         success: false,
//       })
//     );
//   }

//   const hashPassword = hashing.BCryptHash(password);
//   if (isPasswordCorrect) {
//     return res.status(StatusCode.Success).json(
//       handleResponseBody({
//         message: "Welcome Back" + " " + email,
//         data: { user: findUser },
//         status: StatusCode.Success,
//         success: true,
//       })
//     );
//   }
// };

const handleCreateUserByAdmin = async (req: Request, res: Response) => {
  const { email, name, passcode, phone, password } = req.body;
  const fields: Record<string, any> = {
    name: name,
    email: email,
    phone: phone,
    passcode: passcode,
    password: password,
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

  if (!validator.validate(email)) {
    return res.status(StatusCode.Validation).json(
      handleResponseBody({
        message: "You have to enter a valid email",
        data: {},
        status: StatusCode.Validation,
        success: false,
      })
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(StatusCode.Validation).json(
      handleResponseBody({
        message: "User with this email already exists",
        data: {},
        status: StatusCode.Validation,
        success: false,
      })
    );
  }
  const passwordHashed = hashing.BCryptHash(password);

  const token = jwtToken.generateToken({ user: email, version: 1.0 });

  const savedUser = await User.create({
    name: name,
    email,
    passcode,
    phone,
    password: passwordHashed,
    token,
  });

  if (!savedUser) {
    return res.status(StatusCode.ServerError).json(
      handleResponseBody({
        message: "Failed to create user",
        data: {},
        status: StatusCode.ServerError,
        success: false,
      })
    );
  }
  return res.status(StatusCode.Created).json(
    handleResponseBody({
      message: "User created successfully",
      data: { user: savedUser },
      status: StatusCode.Created,
      success: true,
    })
  );
};
export { handleCreateUserByAdmin, handleIsUserExists };
