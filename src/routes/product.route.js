import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { body, param, query } from "express-validator";

const router = Router();

router.get(
  "/",
  validate([
    query("offset").optional().isInt().withMessage("Offset should me a number"),
    query("limit").optional().isInt().withMessage("Limit should me a number"),
  ]),
  authorize(),
  ProductController.getAll,
);
router.get(
  "/:id",
  validate([
    param("id")
      .notEmpty()
      .withMessage("Id is required")
      .isString()
      .withMessage("Id must be a string"),
  ]),
  authorize(),
  ProductController.getById,
);
router.post(
  "/",
  validate([
    body("name")
      .isString()
      .withMessage("Name must be a string.")
      .notEmpty()
      .withMessage("Name is required."),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number."),
    body("description")
      .isString()
      .withMessage("Description must be a string.")
      .notEmpty()
      .withMessage("Description is required."),
    body("category")
      .isString()
      .withMessage("Category must be a string.")
      .notEmpty()
      .withMessage("Category is required."),
    body("stockQuantity")
      .isInt({ min: 0 })
      .withMessage("Stock quantity must be a non-negative integer."),
    body("brand")
      .isString()
      .withMessage("Brand must be a string.")
      .notEmpty()
      .withMessage("Brand is required."),
  ]),
  authorize(true),
  ProductController.create,
);
router.patch(
  "/:id",
  validate([
    param("id")
      .notEmpty()
      .withMessage("Id is required")
      .isString()
      .withMessage("Id must be a string"),
    body("name")
      .optional()
      .isString()
      .withMessage("Name must be a string.")
      .notEmpty()
      .withMessage("Name is required."),
    body("price")
      .optional()
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number."),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string.")
      .notEmpty()
      .withMessage("Description is required."),
    body("category")
      .optional()
      .isString()
      .withMessage("Category must be a string.")
      .notEmpty()
      .withMessage("Category is required."),
    body("stockQuantity")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Stock quantity must be a non-negative integer."),
    body("brand")
      .optional()
      .isString()
      .withMessage("Brand must be a string.")
      .notEmpty()
      .withMessage("Brand is required."),
  ]),
  authorize(true),
  ProductController.update,
);
router.delete(
  "/:id",
  validate([
    param("id")
      .notEmpty()
      .withMessage("Id is required")
      .isString()
      .withMessage("Id must be a string"),
  ]),
  authorize(true),
  ProductController.delete,
);

export default router;
