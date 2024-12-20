const axios = require("axios");
const mysql = require("mysql");

var fuel = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fuel",
});

const fuelSaveData = async () => {
  const d = new Date();
  let update = d.toLocaleString("sv-SE");

  try {
    const daily = await axios.get("http://192.168.10.11/data");
    fuel.query(
      "INSERT INTO daily (updated_at, tank1, tank2) VALUES ('" +
        update +
        "'," +
        daily.data.th1 +
        "," +
        daily.data.th2 +
        ")",
      function (err, result) {
        if (err) console.log(err);
      }
    );
  } catch (error) {
    console.log(error.message + " : Tangki Harian");
  }
  // try {
  //   const monthly = await axios.get("http://192.168.10.11/data");
  //   fuel.query(
  //     "INSERT INTO monthly (updated_at, tank1, tank2, tank3) VALUES ('" +
  //       update +
  //       "'," +
  //       monthly.data.t1 +
  //       "," +
  //       monthly.data.t2 +
  //       "," +
  //       monthly.data.t3 +
  //       ")",
  //     function (err, result) {
  //       if (err) console.log(err);
  //     }
  //   );
  // } catch (error) {
  //   fuel.query(
  //     "INSERT INTO monthly (updated_at, tank1, tank2, tank3) VALUES ('" + update +"', 0, 0, 0)",
  //     function (err, result) {
  //       if (err) console.log(err);
  //     }
  //   );
  // }
};

module.exports = { fuel, fuelSaveData };
