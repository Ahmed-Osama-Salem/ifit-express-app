const jwt = require("jsonwebtoken");

class JwtGenerator {
  private token: any = "";

  public generateToken(data: any) {
    const jwtToken = jwt.sign(data, "01928301982309182039810283", {
      expiresIn: "1h",
    });

    this.token = jwtToken;
    return this.token;
  }

  // public refreshToken(payload: any) {
  //   const refToken = jwt.sign(payload, "01928301982309182039810283", {
  //     expiresIn: "1h",
  //   });
  //   return refToken;
  // }

  public jwtTokenVerify(token: any) {
    try {
      const verified = jwt.verify(token, "01928301982309182039810283");
      return {
        verified,
        code: 200,
        success: true,
      };
    } catch (err: any) {
      // const xc = err.name
      const errors: any = {
        JsonWebTokenError: {
          message: "Token is invalid",
          code: 412,
        },
        TokenExpiredError: {
          message: "Token is expired",
          code: 410,
        },
      };
      return {
        message: errors[err.name].message,
        code: errors[err.name].code,
        success: false,
        status: 401,
      };
    }
  }
}

export { JwtGenerator };
