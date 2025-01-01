const bcrypt = require("bcrypt");

export default class PasswordHasher {
  static saltRounds: any = 10;
  public static hashMaker(text: string) {
    return bcrypt.hashSync(text, this.saltRounds);
  }
  public static hashCompare(text: string, textNeedToCompare: string) {
    return bcrypt.compareSync(text, textNeedToCompare);
  }
}
