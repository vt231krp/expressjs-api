import path from "path";
import fs from "fs";
import { ApiError } from "../utils/api-error.js";
import crypto from "crypto";

const FILE_PATH = path.resolve("src/data/products.json");

export class ProductService {
  static async loadProducts() {
    const rawData = await fs.promises.readFile(FILE_PATH, "utf8");
    return JSON.parse(rawData);
  }

  static async getAllProducts(offset, limit) {
    const products = await this.loadProducts();
    const total = products.length;

    if (offset > total) {
      throw ApiError.BadRequest("Offset should be less then total of products");
    }

    if (limit > 20) {
      limit = 20;
    }

    const res = products.slice(offset, offset + limit);

    return { products: res, total };
  }

  static async getProductsById(id) {
    const products = await this.loadProducts();
    const product = products.find((product) => product.id === id);

    if (product) return product;
    throw ApiError.NotFound(`Product ${id}`);
  }

  static async createProduct(productData) {
    const products = await this.loadProducts();
    const uuid = crypto.randomUUID();

    products.push({ id: uuid, ...productData });
    await fs.promises.writeFile(FILE_PATH, JSON.stringify(products, null, 2));

    return productData;
  }

  static async updateProduct(id, productData) {
    const products = await this.loadProducts();

    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) throw ApiError.NotFound(`Product ${id}`);

    products[productIndex] = { ...products[productIndex], ...productData };
    await fs.promises.writeFile(FILE_PATH, JSON.stringify(products, null, 2));

    return products[productIndex];
  }

  static async deleteProduct(id) {
    const products = await this.loadProducts();

    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) throw ApiError.NotFound(`Product ${id}`);

    products.splice(productIndex, 1);
    await fs.promises.writeFile(FILE_PATH, JSON.stringify(products, null, 2));
  }
}
