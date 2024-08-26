const axios = require("axios");
const mysql = require("mysql");

var fuel = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fuel_tank",
});

const fuelSaveData = async () => {
  const daily = await axios.get("http://192.168.10.11/data");
  // const monthly = await axios.get("http://192.168.10.11/data");

  const d = new Date();
  let update = d.toLocaleString("sv-SE");

  fuel.query(
    "INSERT INTO daily_tank (updated_at, tank1, tank2) VALUES ('" +
      update +
      "'," +
      daily.data.t1 +
      "," +
      daily.data.t2 +
      ")",
    function (err, result) {
      if (err) console.log(err);
    }
  );
  
//   fuel.query(
//    "INSERT INTO monthly_tank (updated_at, tank1, tank2, tank3) VALUES ('" +
//      update +
//      "'," +
//      monthly.data.t1 +
//      "," +
//      monthly.data.t2 +
//      "," +
//      monthly.data.t3 +
//      ")",
//    function (err, result) {
//      if (err) console.log(err);
//    }
//  );
console.log('Fuel Data Saved');

};

module.exports = { fuel, fuelSaveData };
