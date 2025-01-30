import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export class TokenService {
  static async generateToken(payload) {
    return jwt.sign({ user: payload }, JWT_SECRET, { expiresIn: "1h" });
  }

  static async validateToken(token) {
    return jwt.verify(token, JWT_SECRET);
  }
}
