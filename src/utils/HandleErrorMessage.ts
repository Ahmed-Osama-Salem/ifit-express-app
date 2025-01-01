export default class HandleErrorMessage {
  public errorCodeMessag(error: any) {
    switch (error.code) {
      case 11000:
        return {
          data: {},
          message: `This value ${
            Object.values(error.keyValue)[0]
          } already exists`,
          success: false,
          status: 422,
        };

      default:
        return {
          data: {},
          message: "Error Happend ",
          success: false,
          status: 400,
        };
    }
  }
}
