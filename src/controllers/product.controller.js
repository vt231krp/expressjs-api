import { ProductService } from "../services/product.service.js";

class ProductController {
  async getAll(req, res, next) {
    try {
      const { offset, limit } = req.query;

      const parseOffset = parseInt(offset);
      const parseLimit = parseInt(limit);

      const { products, total } = await ProductService.getAllProducts(
        parseOffset || 0,
        parseLimit || 20,
      );
      res.status(200).json({ data: { products, total }, success: true });
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductsById(id);

      res.status(200).json({ data: product, success: true });
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const productData = req.body;
      const newProduct = await ProductService.createProduct(productData);

      res.status(201).json({ data: newProduct, success: true });
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const {
        params: { id },
        body,
      } = req;
      const update = await ProductService.updateProduct(id, body);

      res.status(201).json({ data: { update }, success: true });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await ProductService.deleteProduct(id);

      res.status(204).json({ message: "Deleted successfully", success: true });
    } catch (err) {
      next(err);
    }
  }
}

export default new ProductController();
