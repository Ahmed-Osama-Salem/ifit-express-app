/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import createSecretHash from "../../utils/TokenEnvInfo";
import { v4 as uuidv4 } from "uuid";
import { JwtGenerator } from "../../utils/JwtGenerator";
import HashingService from "../../utils/Hashing";
import tokenModel from "../../models/Token";
import handleResponseBody, { StatusCode } from "../../utils/HandleResponse";
const jwtToken = new JwtGenerator();
const hashing = new HashingService();

export const handleCreateOAuth = async (req: Request, res: Response) => {
  const { platform, token, timestamp } = req.body;
  const platforms = ["web", "android", "ios"];
  if (!platforms.includes(platform)) {
    return res.status(StatusCode.Not_Authorized).send(
      handleResponseBody({
        message: "Platform not found",
        success: false,
        data: {},
        status: StatusCode.Not_Authorized,
      })
    );
  }
  if (!platform || !token || !timestamp) {
    return res.status(StatusCode.Validation).send(
      handleResponseBody({
        message: "All fields required",
        success: false,
        data: {},
        status: StatusCode.Validation,
      })
    );
  }

  const secretKey = await createSecretHash(platform);
  const finalLocalToken = `${secretKey.localValues}${timestamp}`;
  console.log(hashing.BCryptHash(finalLocalToken));
  const finalClientToken = `$2a$10$${token}`;
  console.log(finalLocalToken);
  console.log(finalClientToken);
  const isClientTokenCorrect = hashing.BCryptComper(
    finalLocalToken,
    finalClientToken
  );

  console.log(isClientTokenCorrect);
  if (!isClientTokenCorrect) {
    return res.status(StatusCode.Not_Authorized).send(
      handleResponseBody({
        message: "invalid token",
        success: false,
        data: {},
        status: StatusCode.Not_Authorized,
      })
    );
  }

  // Create JWT
  const deviceId = uuidv4();
  const TokenJWT = jwtToken.generateToken({
    platform: platform,
    deviceId,
    version: 1.0,
    expires: 3600,
  });

  const _saveToken = await tokenModel.create({
    token: TokenJWT,
    deviceId,
    version: 1.0,
  });

  return res.status(StatusCode.Success).send(
    handleResponseBody({
      message: "Token Created",
      success: true,
      data: {
        token: TokenJWT,
        expires: 3600,
      },
      status: StatusCode.Success,
    })
  );
};
export const handleVrifyToken = async (req: Request, res: Response) => {
  const jwtToken = new JwtGenerator();

  const { token } = req.body;
  if (!token) {
    return res.status(StatusCode.Validation).send({
      message: "All fields is required",
      status: StatusCode.Validation,
      code: StatusCode.Validation,
      success: false,
    });
  }
  const verifyJWTToken = jwtToken.jwtTokenVerify(token);
  // check if JWT token is correct timeDifference
  if (!verifyJWTToken.success) {
    return res.status(StatusCode.Not_Authorized).send(
      handleResponseBody({
        message: verifyJWTToken.message,
        success: false,
        data: {},
        status: StatusCode.Not_Authorized,
      })
    );
  }
  // check if the hash token inside jwt token

  res.status(StatusCode.Success).send(
    handleResponseBody({
      message: "Token is valid",
      success: true,
      data: {},
      status: StatusCode.Success,
    })
  );
};

export const handleRefreshOAuth = async (req: Request, res: Response) => {
  const { token } = req.body;
  const verifyJWTToken = jwtToken.jwtTokenVerify(token);
  console.log(verifyJWTToken);
  if (verifyJWTToken.code === 412 || verifyJWTToken.code === 410) {
    console.log();
    return res.status(StatusCode.Not_Authorized).send(
      handleResponseBody({
        message: "Token is invalid",
        success: false,
        data: {},
        status: StatusCode.Not_Authorized,
      })
    );
  }
  const clientDeviceId = verifyJWTToken.verified.deviceId;
  const clientPlatform = verifyJWTToken.verified.platform;
  const checkIfClientIdExists = await tokenModel.findOne({
    deviceId: clientDeviceId,
  });
  if (!checkIfClientIdExists) {
    return res.status(StatusCode.NotFound).send(
      handleResponseBody({
        message: "Device id not found you have to create new token",
        success: false,
        data: {},
        status: StatusCode.NotFound,
      })
    );
  }
  console.log(clientDeviceId);
  const TokenJWT = jwtToken.generateToken({
    platform: clientPlatform,
    deviceId: clientDeviceId,
    expires: 3600,
  });
  const updateClientToken = await tokenModel.updateOne({ token: TokenJWT });
  return res.status(StatusCode.Success).send(
    handleResponseBody({
      message: "Token updated successfully",
      success: false,
      data: {
        token: TokenJWT,
        expires: 3600,
      },
      status: StatusCode.Success,
    })
  );
};
