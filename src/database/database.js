import mysql from "promise-mysql";
import config from "./../config";

const connection = mysql.createConnection({
  host: config.host,
  port: 3306,
  database: config.database,
  user: config.user,
  password: config.password,
});

const getConnection = () => {
  return connection;
};

module.exports = {
  getConnection,
};
