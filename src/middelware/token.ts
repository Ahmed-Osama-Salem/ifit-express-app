import { NextFunction, Request, Response } from "express";
import { JwtGenerator } from "../utils/JwtGenerator";
import handleResponseBody, { StatusCode } from "../utils/HandleResponse";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const tokenVerify = new JwtGenerator();
  const token =
    req.body["authorization"] ||
    req.query["authorization"] ||
    req.headers["authorization"];

  // "Access Denied. No token provided."
  if (!token) {
    return res.status(StatusCode.Not_Authorized).send(
      handleResponseBody({
        message: "Access Denied. No token provided",
        status: StatusCode.Not_Authorized,
        success: false,
        data: {},
      })
    );
  }
  const verifyJWTToken = tokenVerify.jwtTokenVerify(token);
  // check if JWT token is correct
  if (!verifyJWTToken.success) {
    return res.status(StatusCode.Not_Authorized).send({
      message: verifyJWTToken.message,
      status: StatusCode.Not_Authorized,
      success: false,
    });
  }
  next();
  // try {
  //   tokenVerify.jwtTokenVerify(token);
  //   next();
  //   // return res.status(200).send("verified token , welcome");
  // } catch (error) {
  //   return res.status(400).send("Invalid Token.");
  // }
};

module.exports = authenticate;
