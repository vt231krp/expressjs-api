import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { body } from "express-validator";

const router = Router();

router.post(
  "/",
  validate([
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6, max: 64 })
      .withMessage("The password must be at least 8 and no more than 64"),
    body("role")
      .optional()
      .matches(new RegExp("\\b(Admin|User)\\b"))
      .withMessage("Unknown role"),
  ]),
  UserController.authUser,
);

export default router;
