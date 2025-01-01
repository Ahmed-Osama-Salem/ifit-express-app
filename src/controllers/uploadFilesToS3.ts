import { Request } from "express";
import formidable from "formidable";
import { Transform } from "stream";
import { Upload } from "@aws-sdk/lib-storage";
import config from "../config";
import { s3Client } from "../utils/s3SdkClient";

const Bucket = config.aws.S3_BUCKET;

const parsefile = async (req: Request) => {
  return new Promise((resolve, reject) => {
    let options = {
      maxFileSize: 3 * 1024 * 1024, //100 MBs converted to bytes,
      allowEmptyFiles: false,
    };

    const form = formidable(options);

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Form parse error:", err);
        reject(err);
      }

      if (!files.file) {
        const error = {
          status: 422,
          message: "No file uploaded , file is required",
        };
        reject(error);
      }
    });

    form.on("error", (error: Error) => {
      // console.log("====================================");
      // console.log(error, "error event");
      // console.log("====================================");
      reject(error.message);
    });

    form.on("data", (data: { name: string; value: unknown }) => {
      if (data.name === "file") {
        // const s3FileResponse = {
        //   success: true,
        //   status: 200,
        //   message: "file uploaded successfuly",
        //   _filename: data.value?.Key,
        //   url: data.value?.Location,
        // };
        resolve(data.value);
      }
    });

    form.on("fileBegin", (formName, file: any) => {
      file.open = async function () {
        this._writeStream = new Transform({
          transform(chunk, encoding, callback) {
            callback(null, chunk);
          },
        });

        this._writeStream.on("error", (e: formidable.EmitData) => {
          console.log(e);

          form.emit("data", e);
        });

        // upload to S3
        new Upload({
          client: s3Client,
          params: {
            // ACL: "public-read",
            Bucket,
            Key: `${Date.now().toString()}-${this.originalFilename}`,
            Body: this._writeStream,
          },
          tags: [], // optional tags
          queueSize: 4, // optional concurrency configuration
          partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
          leavePartsOnError: false, // optional manually handle dropped parts
        })
          .done()
          .then((data: any) => {
            form.emit("data", {
              name: "file",
              value: data,
              formname: undefined,
            });
          })
          .catch((err: formidable.EmitData) => {
            form.emit("data", err);
          });
      };
      file.end = function (cb: () => void) {
        this._writeStream.on("finish", () => {
          this.emit("end");
          cb();
        });
        this._writeStream.end();
      };
    });
  });
};

export default parsefile;
