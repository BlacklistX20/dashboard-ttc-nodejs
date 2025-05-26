const mysql = require("mysql2");

var temp = mysql.createConnection({
  host: "localhost",
  user: "syfrl",
  password: "Fos@000",
  database: "temp",
});

const electric = mysql.createConnection({
  host: "localhost",
  user: "syfrl",
  password: "Fos@000",
  database: "power",
});

var fuel = mysql.createConnection({
  host: "localhost",
  user: "syfrl",
  password: "Fos@000",
  database: "fuel",
});

module.exports = { temp, electric, fuel };
