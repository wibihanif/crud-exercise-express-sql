import db, { asyncQuery } from "../db/index.js";
import { signToken } from "../lib/jwt.js";

const merchantController = {
  registerMerchant: async (req, res) => {
    try {
      if (req.body.password.length < 5) {
        return res.status(400).json({
          message: "password must be at least 6 chars",
        });
      }

      if (req.body.name.length < 3) {
        return res.status(400).json({
          message: "name must be at least 3 chars",
        });
      }

      const getUsername = await asyncQuery(`SELECT username FROM merchant;`);

      const arrUsername = JSON.parse(JSON.stringify(getUsername));

      for (let username of arrUsername) {
        if (req.body.username == username.username) {
          return res.status(400).json({
            message: "username already exist",
          });
        }
      }

      const today = new Date();

      const date = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      const exactTime = `${date}-${month}-${year}`;

      await asyncQuery(
        `INSERT INTO minipro.merchant (name, username, password, address, date, phone_number) VALUES ("${req.body.name}", "${req.body.username}", "${req.body.password}", "${req.body.address}", "${exactTime}", ${req.body.phone_number});`
      );

      const getRegisteredMerchant = await asyncQuery(
        `SELECT * FROM minipro.merchant WHERE username = "${req.body.username}";`
      );

      return res.status(201).json({
        message: "merchant registered",
        data: getRegisteredMerchant,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  deleteMerchant: async (req, res) => {
    try {
      const getMerchantById = await asyncQuery(
        `SELECT * FROM minipro.merchant WHERE id = "${req.params.id}";`
      );

      await asyncQuery(`DELETE FROM merchant WHERE id = "${req.params.id}";`);

      return res.status(201).json({
        message: "merchant deleted",
        data: getMerchantById,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  getAllProductsFromMerchant: async (req, res) => {
    try {
      const getProductFromMerchant = await asyncQuery(
        `SELECT * FROM product WHERE merchantId = ${req.params.id};`
      );

      return res.status(200).json({
        message: "get all products from merchant",
        data: getProductFromMerchant,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  loginMerchant: async (req, res) => {
    try {
      // const getUsername = await asyncQuery(`SELECT username FROM merchant;`);
      // const arrUsername = JSON.parse(JSON.stringify(getUsername));
      // const getPassword = await asyncQuery(`SELECT password FROM merchant;`);
      // const arrPassword = JSON.parse(JSON.stringify(getPassword));
      // for (let username of arrUsername) {
      //   if (req.body.username == username.username) {
      //     if (req.body.password == arrPassword[i].password) {
      //       return res.status(401).json({
      //         message: "user logged in",
      //       });
      //     }
      //   }
      // }

      const userLoggedIn = await asyncQuery(
        `SELECT * FROM merchant WHERE username = "${req.body.username}" AND password = "${req.body.password}";`
      );

      const arrUserLoggedIn = JSON.parse(JSON.stringify(userLoggedIn));

      const token = signToken({
        id: arrUserLoggedIn[0].id,
      });

      // console.log(arrUserLoggedIn);

      return res.status(200).json({
        message: "user login",
        data: userLoggedIn,
        token: token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
};

export default merchantController;
