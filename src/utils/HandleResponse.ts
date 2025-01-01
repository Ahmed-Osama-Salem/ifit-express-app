export enum StatusCode {
  Validation = 422,
  Success = 200,
  NotFound = 404,
  Created = 201,
  Not_Authorized = 401,
  ServerError = 500,
}

interface HandleResponse {
  message: string;
  status: StatusCode;
  success: boolean;
  data: Record<any, any>;
}
const handleResponseBody = ({
  message,
  status,
  success,
  data,
}: HandleResponse) => {
  return {
    message,
    status,
    success,
    data,
  };
};
export default handleResponseBody;
