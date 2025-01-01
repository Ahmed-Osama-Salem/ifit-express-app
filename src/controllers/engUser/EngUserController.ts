import { Request, Response } from "express";
import EngUser from "../../models/EngUser";
import handleResponseBody, { StatusCode } from "../../utils/HandleResponse";
import { JwtGenerator } from "../../utils/JwtGenerator";
const validator = require("email-validator");
const jwtToken = new JwtGenerator();

const handleCreateNewEngUser = async (req: Request, res: Response) => {
  const { name, email, phone, permissions } = req.body;
  const fields: Record<string, any> = {
    name: name,
    email: email,
    phone: phone,
    permissions: permissions,
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
  const isEmailUser = await EngUser.findOne({ email, phone });

  if (isEmailUser) {
    return res.status(StatusCode.Validation).json(
      handleResponseBody({
        message: "User Already Exists",
        data: {},
        status: StatusCode.Validation,
        success: true,
      })
    );
  }

  try {
    const token = jwtToken.generateToken({ user: email, version: 1.0 });
    const user = await EngUser.create({
      name,
      email,
      phone,
      permissions,
      token: token,
    });
    return res.status(StatusCode.Created).json(
      handleResponseBody({
        message: "User created successfully",
        data: { user },
        status: StatusCode.Created,
        success: true,
      })
    );
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(StatusCode.Validation).json(
        handleResponseBody({
          message: error.message,
          data: {},
          status: StatusCode.Validation,
          success: false,
        })
      );
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default handleCreateNewEngUser;
