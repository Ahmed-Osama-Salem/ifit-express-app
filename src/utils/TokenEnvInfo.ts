import config from "../config";

const createSecretHash = async (method: "android" | "web" | "ios") => {
  const infoEnv: {
    [key: string]: {
      clientID: string;
      clientSecret: string;
      clientPlateForm: string;
    };
  } = {
    web: {
      clientID: config.dev.WEB_CLIENT_ID as string,
      clientSecret: config.dev.WEB_CLIENT_SECRET as string,
      clientPlateForm: config.dev.WEB_CLIENT_PLATEFORM as string,
    },
    android: {
      clientID: config.dev.ANDROID_CLIENT_ID as string,
      clientSecret: config.dev.ANDROID_CLIENT_SECRET as string,
      clientPlateForm: config.dev.ANDROID_CLIENT_PLATEFORM as string,
    },
    ios: {
      clientID: config.dev.IOS_CLIENT_ID as string,
      clientSecret: config.dev.IOS_CLIENT_SECRET as string,
      clientPlateForm: config.dev.IOS_CLIENT_PLATEFORM as string,
    },
  };

  // const localToken = `${hashing.MD5Hasher(infoEnv[method].clientID)}${hashing.MD5Hasher(infoEnv[method].clientSecret)}${hashing.MD5Hasher(infoEnv[method].clientPlateForm)}`
  const localValues = `${infoEnv[method].clientID}${infoEnv[method].clientSecret}${infoEnv[method].clientPlateForm}`;

  return { clientData: infoEnv[method], localValues };
  // infoEnv.tokenLocal = `${infoEnv.clientID}${infoEnv.clientSecret}${infoEnv.clientPlateForm}`;
};

export default createSecretHash;
