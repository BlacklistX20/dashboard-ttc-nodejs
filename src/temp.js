const axios = require("axios");
const mysql = require("mysql");

var temp = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "temp",
});

const lantai4RealTimeData = async () => {
  const battery = await axios.get("http://192.168.10.72/data");
  const recti = await axios.get("http://192.168.10.78/data");
  const bss = await axios.get("http://192.168.10.73/data");
  const inter = await axios.get("http://192.168.10.76/data");
  const trans = await axios.get("http://192.168.10.77/data");

  const d = new Date();
  let update = d.toLocaleString("sv-SE");

  temp.query(
    "UPDATE battery4 SET updated_at = '" +
      update +
      "', t1 = " +
      battery.data.s1 +
      ", h1 = " +
      battery.data.k1 +
      ", t2 = " +
      battery.data.s2 +
      ", h2 = " +
      battery.data.k2 +
      ", t_avg = " +
      battery.data.sAvg +
      ", h_avg = " +
      battery.data.kAvg +
      " WHERE id = 1",
    function (err, result) {
      if (err) console.log(err);
    }
  );
  temp.query(
    "UPDATE recti4 SET updated_at = '" +
      update +
      "', t1 = " +
      recti.data.s1 +
      ", h1 = " +
      recti.data.k1 +
      ", t2 = " +
      recti.data.s2 +
      ", h2 = " +
      recti.data.k2 +
      ", t3 = " +
      recti.data.s3 +
      ", h3 = " +
      recti.data.k3 +
      ", t_avg = " +
      recti.data.sAvg +
      ", h_avg = " +
      recti.data.kAvg +
      " WHERE id = 1",
    function (err, result) {
      if (err) console.log(err);
    }
  );
  temp.query(
    "UPDATE bss SET updated_at = '" +
      update +
      "', t1 = " +
      bss.data.s1 +
      ", h1 = " +
      bss.data.k1 +
      ", t2 = " +
      bss.data.s2 +
      ", h2 = " +
      bss.data.k2 +
      ", t3 = " +
      bss.data.s3 +
      ", h3 = " +
      bss.data.k3 +
      ", t4 = " +
      bss.data.s4 +
      ", h4 = " +
      bss.data.k4 +
      ", t_avg = " +
      bss.data.sAvg +
      ", h_avg = " +
      bss.data.kAvg +
      " WHERE id = 1",
    function (err, result) {
      if (err) console.log(err);
    }
  );
  temp.query(
    "UPDATE inter SET updated_at = '" +
      update +
      "', t1 = " +
      inter.data.s1 +
      ", h1 = " +
      inter.data.k1 +
      ", t2 = " +
      inter.data.s2 +
      ", h2 = " +
      inter.data.k2 +
      ", t3 = " +
      inter.data.s3 +
      ", h3 = " +
      inter.data.k3 +
      ", t4 = " +
      inter.data.s4 +
      ", h4 = " +
      inter.data.k4 +
      ", t_avg = " +
      inter.data.sAvg +
      ", h_avg = " +
      inter.data.kAvg +
      " WHERE id = 1",
    function (err, result) {
      if (err) console.log(err);
    }
  );
  temp.query(
    "UPDATE trans SET updated_at = '" +
      update +
      "', t1 = " +
      trans.data.s1 +
      ", h1 = " +
      trans.data.k1 +
      ", t2 = " +
      trans.data.s2 +
      ", h2 = " +
      trans.data.k2 +
      ", t3 = " +
      trans.data.s3 +
      ", h3 = " +
      trans.data.k3 +
      ", t4 = " +
      trans.data.s4 +
      ", h4 = " +
      trans.data.k4 +
      ", t5 = " +
      trans.data.s5 +
      ", h5 = " +
      trans.data.k5 +
      ", t6 = " +
      trans.data.s6 +
      ", h6 = " +
      trans.data.k6 +
      ", t_avg = " +
      trans.data.sAvg +
      ", h_avg = " +
      trans.data.kAvg +
      " WHERE id = 1",
    function (err, result) {
      if (err) console.log(err);
    }
  );
};

const lantai4SaveData = async () => {
  const battery = await axios.get("http://192.168.10.72/data");
  const recti = await axios.get("http://192.168.10.78/data");
  const bss = await axios.get("http://192.168.10.73/data");
  const inter = await axios.get("http://192.168.10.76/data");
  const trans = await axios.get("http://192.168.10.77/data");

  const d = new Date();
  let update = d.toLocaleString("sv-SE");

  temp.query(
    "INSERT INTO battery4 (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES ('" +
      update +
      "'," +
      battery.data.s1 +
      "," +
      battery.data.k1 +
      "," +
      battery.data.s2 +
      "," +
      battery.data.k2 +
      "," +
      battery.data.sAvg +
      "," +
      battery.data.kAvg +
      ")",
    function (err, result) {
      if (err) console.log(err);
    }
  );

  temp.query(
    "INSERT INTO recti4 (updated_at, t1, h1, t2, h2, t3, h3, t_avg, h_avg) VALUES ('" +
      update +
      "'," +
      recti.data.s1 +
      "," +
      recti.data.k1 +
      "," +
      recti.data.s2 +
      "," +
      recti.data.k2 +
      "," +
      recti.data.s3 +
      "," +
      recti.data.k3 +
      "," +
      recti.data.sAvg +
      "," +
      recti.data.kAvg +
      ")",
    function (err, result) {
      if (err) console.log(err);
    }
  );

  temp.query(
    "INSERT INTO bss (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t_avg, h_avg) VALUES ('" +
      update +
      "'," +
      bss.data.s1 +
      "," +
      bss.data.k1 +
      "," +
      bss.data.s2 +
      "," +
      bss.data.k2 +
      "," +
      bss.data.s3 +
      "," +
      bss.data.k3 +
      "," +
      bss.data.s4 +
      "," +
      bss.data.k4 +
      "," +
      bss.data.sAvg +
      "," +
      bss.data.kAvg +
      ")",
    function (err, result) {
      if (err) console.log(err);
    }
  );

  temp.query(
    "INSERT INTO inter (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t_avg, h_avg) VALUES ('" +
      update +
      "'," +
      inter.data.s1 +
      "," +
      inter.data.k1 +
      "," +
      inter.data.s2 +
      "," +
      inter.data.k2 +
      "," +
      inter.data.s3 +
      "," +
      inter.data.k3 +
      "," +
      inter.data.s4 +
      "," +
      inter.data.k4 +
      "," +
      inter.data.sAvg +
      "," +
      inter.data.kAvg +
      ")",
    function (err, result) {
      if (err) console.log(err);
    }
  );

  temp.query(
    "INSERT INTO trans (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t5, h5, t6, h6, t_avg, h_avg) VALUES ('" +
      update +
      "'," +
      trans.data.s1 +
      "," +
      trans.data.k1 +
      "," +
      trans.data.s2 +
      "," +
      trans.data.k2 +
      "," +
      trans.data.s3 +
      "," +
      trans.data.k3 +
      "," +
      trans.data.s4 +
      "," +
      trans.data.k4 +
      "," +
      trans.data.s5 +
      "," +
      trans.data.k5 +
      "," +
      trans.data.s6 +
      "," +
      trans.data.k6 +
      "," +
      trans.data.sAvg +
      "," +
      trans.data.kAvg +
      ")",
    function (err, result) {
      if (err) console.log(err);
    }
  );
  console.log('4th Floor Temperature Data Saved');
};

module.exports = { lantai4RealTimeData, lantai4SaveData, temp };
