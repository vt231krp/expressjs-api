import { ApiError } from "../utils/api-error.js";
import { TokenService } from "../services/token.service.js";
import { USER_ROLE } from "../controllers/user.controller.js";

export function authorize(onlyAdmin = false) {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return next(ApiError.Unauthorized());

    const token = authHeader.split(" ")[1];
    if (!token) return next(ApiError.Unauthorized());

    const validateData = await TokenService.validateToken(token);
    const user = validateData.user;

    if (onlyAdmin && user.role !== USER_ROLE.ADMIN)
      return next(ApiError.Forbidden());

    req.user = user;

    next();
  };
}
