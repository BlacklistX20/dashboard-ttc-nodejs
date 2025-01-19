const mysql = require("mysql");

var temp = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "temp",
});

const electric = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "power", 
});

var fuel = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fuel",
});

module.exports = { temp, electric, fuel };