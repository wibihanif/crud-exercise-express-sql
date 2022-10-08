import db, { asyncQuery } from "../db/index.js";

const productController = {
  createProduct: async (req, res) => {
    try {
      if (req.body.productname.length < 3) {
        return res.status(400).json({
          message: "name must be at least 3 chars",
        });
      }

      if (req.body.quantity < 1 && req.body.quantity > 51) {
        return res.status(400).json({
          message: "quantity should be between 1-50",
        });
      }

      if (req.body.price <= 10000) {
        return res.status(400).json({
          message: "price should be at least 10000",
        });
      }

      await asyncQuery(
        `INSERT INTO minipro.product (productname, price, quantity, merchantId) VALUES ("${req.body.productname}", "${req.body.price}", "${req.body.quantity}", "${req.body.merchantId}");`
      );

      const getAddedProduct = await asyncQuery(
        `SELECT * FROM minipro.product WHERE productname = "${req.body.productname}";`
      );

      return res.status(201).json({
        message: "product added",
        data: getAddedProduct,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  deleteProductById: async (req, res) => {
    try {
      const getProductById = await asyncQuery(
        `SELECT * FROM minipro.product WHERE id = "${req.params.id}";`
      );

      await asyncQuery(`DELETE FROM product WHERE id = "${req.params.id}";`);

      return res.status(201).json({
        message: "product deleted",
        data: getProductById,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  editProductById: async (req, res) => {
    try {
      await asyncQuery(
        `UPDATE product SET productname = "${req.body.productname}", price = ${req.body.price}, quantity = ${req.body.quantity} WHERE id = ${req.params.id};`
      );

      const getProductById = await asyncQuery(
        `SELECT * FROM minipro.product WHERE id = "${req.params.id}";`
      );

      return res.status(200).json({
        message: "product edited",
        data: getProductById,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
};

export default productController;
