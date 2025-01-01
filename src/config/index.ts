import dotenv from "dotenv";

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("no .env file found");
}

export default {
  dev: {
    port: parseInt(process.env.PORT as string, 10),
    WEB_CLIENT_ID: process.env.WEB_CLIENT_ID,
    WEB_CLIENT_SECRET: process.env.WEB_CLIENT_SECRET,
    WEB_CLIENT_PLATEFORM: process.env.WEB_CLIENT_PLATEFORM,
    ANDROID_CLIENT_ID: process.env.ANDROID_CLIENT_ID,
    ANDROID_CLIENT_SECRET: process.env.ANDROID_CLIENT_SECRET,
    ANDROID_CLIENT_PLATEFORM: process.env.ANDROID_CLIENT_PLATEFORM,
    IOS_CLIENT_ID: process.env.IOS_CLIENT_ID,
    IOS_CLIENT_SECRET: process.env.IOS_CLIENT_SECRET,
    IOS_CLIENT_PLATEFORM: process.env.IOS_CLIENT_PLATEFORM,
  },
  aws: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    S3_REGION: process.env.S3_REGION,
    S3_BUCKET: process.env.S3_BUCKET,
  },
};
