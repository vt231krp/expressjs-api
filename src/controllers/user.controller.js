import { TokenService } from "../services/token.service.js";

export const USER_ROLE = {
  ADMIN: "Admin",
  USER: "User",
};

class UserController {
  async authUser(req, res, next) {
    try {
      const userData = req.body;
      const token = await TokenService.generateToken(userData);

      res
        .status(200)
        .json({ data: { user: userData, token: token }, success: true });
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
