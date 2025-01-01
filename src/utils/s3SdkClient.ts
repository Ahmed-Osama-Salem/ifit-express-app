import { S3Client } from "@aws-sdk/client-s3";
import config from "../config";

const accessKeyId = config.aws.AWS_ACCESS_KEY_ID as string;
const secretAccessKey = config.aws.AWS_SECRET_ACCESS_KEY as string;
const region = config.aws.S3_REGION as string;

const s3Client = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

export { s3Client };
