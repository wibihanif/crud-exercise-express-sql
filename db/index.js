import mysql from "mysql";
import util from "util";

const db = mysql.createConnection({
  user: "root",
  password: "password",
  port: 3306,
  database: "minipro",
  multipleStatements: "false",
});

export const asyncQuery = util.promisify(db.query).bind(db);

export default db;
