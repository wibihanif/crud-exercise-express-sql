import express from "express";
import db from "./db/index.js";
import { merchantRoute, productRoute } from "./routes/index.js";

const PORT = 2000;
const app = express();

app.use(express.json());

app.use("/merchants", merchantRoute);
app.use("/products", productRoute);

app.listen(PORT, () => {
  db.connect((err) => {
    if (err) console.log(err);

    console.log("MYSQL connected");
  });

  console.log("API listening in PORT", PORT);
});
