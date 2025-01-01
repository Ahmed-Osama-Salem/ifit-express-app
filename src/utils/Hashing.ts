const bcrypt = require("bcrypt");
class HashingService {
  public BCryptHash(createHash: string | number) {
    return bcrypt.hashSync(createHash, 5, function (err: any, hash: any) {
      return hash;
    });
  }

  public BCryptComper(plainValue: string, hashedValue: string) {
    return bcrypt.compareSync(plainValue, hashedValue);
  }
}
export default HashingService;
