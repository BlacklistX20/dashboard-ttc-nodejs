const axios = require("axios");
const mysql = require("mysql");

var electric = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "power",
});

function avg(...nums) {
	let sum = 0;
	nums.forEach((num) => {
		sum += num;
	});
	let avg = sum / nums.length;
	return avg;
}

function sum(...nums) {
	let sum = 0;
	nums.forEach((num) => {
		sum += num;
	});
	return sum;
}

const realTimeData = async () => {
   const lvmdp = await axios.get("http://192.168.10.13/data");

   const p205 = await axios.get("http://192.168.10.32/data");
   const p236 = await axios.get("http://192.168.10.33/data");
   const p305 = await axios.get("http://192.168.10.52/data");
   const p310 = await axios.get("http://192.168.10.55/data");
   const p429 = await axios.get("http://192.168.10.75/data");
 
   const ups2 = await axios.get("http://192.168.10.34/data");
   const ups3 = await axios.get("http://192.168.10.53/data");
   const ups5 = await axios.get("http://192.168.10.92/data");
 
   let pRecti = sum(parseFloat(p205.data.p), parseFloat(p236.data.p), parseFloat(p305.data.p305), parseFloat(p310.data.p310), parseFloat(p429.data.p));
   let iRecti = sum(parseFloat(p205.data.i), parseFloat(p236.data.i), parseFloat(p305.data.i305), parseFloat(p310.data.i310), parseFloat(p429.data.i));
   let vRecti = avg(parseFloat(p205.data.v), parseFloat(p236.data.v), parseFloat(p305.data.v305), parseFloat(p310.data.v310), parseFloat(p429.data.v));
   let fRecti = avg(parseFloat(p205.data.f), parseFloat(p236.data.f), parseFloat(p305.data.f305), parseFloat(p310.data.f310), parseFloat(p429.data.f));
 
   let pUPS = sum(parseFloat(ups2.data.p243), parseFloat(ups2.data.p242), parseFloat(ups3.data.pA), parseFloat(ups3.data.pB), parseFloat(ups5.data.p501), parseFloat(ups5.data.p502));
   let iUPS = sum(parseFloat(ups2.data.i243), parseFloat(ups2.data.i242), parseFloat(ups3.data.iA), parseFloat(ups3.data.iB), parseFloat(ups5.data.i501), parseFloat(ups5.data.i502));
   let vUPS = avg(parseFloat(ups2.data.v243), parseFloat(ups2.data.v242), parseFloat(ups3.data.vA), parseFloat(ups3.data.vB), parseFloat(ups5.data.v501), parseFloat(ups5.data.v502));
   let fUPS = avg(parseFloat(ups2.data.f243), parseFloat(ups2.data.f242), parseFloat(ups3.data.fA), parseFloat(ups3.data.fB), parseFloat(ups5.data.f501), parseFloat(ups5.data.f502));
 
   let pIt = sum(pRecti, pUPS);
   let iIt = sum(iRecti, iUPS);
   let vIt = avg(vRecti, vUPS);
   let fIt = avg(fRecti, fUPS);

   let pue = ((parseFloat(lvmdp.data.p)) / pIt).toFixed(2);
 
   const d = new Date();
   let update = d.toLocaleString("sv-SE");
   
   // update for real time PUE
   electric.query("UPDATE real_time SET last_update = '" + update + "', loads = " + pue + ", current = 0, voltage = 0, frequency = 0 WHERE id = 1", function (err, result) {
      if (err) console.log(err);
   });
   // query for real time LVMDP
   electric.query("UPDATE real_time SET last_update = '" + update + "', loads = " + lvmdp.data.p + ", current = " + lvmdp.data.i + ", voltage = " + lvmdp.data.v + ", frequency = " + lvmdp.data.f + " WHERE id = 2", function (err, result) {
      if (err) console.log(err);
   });
   // query for real time IT
   electric.query("UPDATE real_time SET last_update = '" + update + "', loads = " + pIt + ", current = " + iIt + ", voltage = " + vIt + ", frequency = " + fIt + " WHERE id = 3", function (err, result) {
     if (err) console.log(err);
   });
   // query for real time Recti
   electric.query("UPDATE real_time SET last_update = '" + update + "', loads = " + pRecti + ", current = " + iRecti + ", voltage = " + vRecti + ", frequency = " + fRecti + " WHERE id = 4", function (err, result) {
     if (err) console.log(err);
   });
   // query for real time UPS
   electric.query("UPDATE real_time SET last_update = '" + update + "', loads = " + pUPS + ", current = " + iUPS + ", voltage = " + vUPS + ", frequency = " + fUPS + " WHERE id = 5", function (err, result) {
     if (err) console.log(err);
   });
   // query for real time panel 2.05
   electric.query("UPDATE real_time SET last_update = '" + update + "', loads = " + p205.data.p + ", current = " + p205.data.i + ", voltage = " + p205.data.v + ", frequency = " + p205.data.f + " WHERE id = 6", function (err, result) {
      if (err) console.log(err);
   });
   // query for real time panel 2.36
   electric.query("UPDATE real_time SET last_update = '" + update + "', loads = " + p236.data.p + ", current = " + p236.data.i + ", voltage = " + p236.data.v + ", frequency = " + p236.data.f + " WHERE id = 7", function (err, result) {
      if (err) console.log(err);
   });
   // query for real time panel 3.05
   electric.query("UPDATE real_time SET last_update = '" + update + "', loads = " + p305.data.p305 + ", current = " + p305.data.i305 + ", voltage = " + p305.data.v305 + ", frequency = " + p305.data.f305 + " WHERE id = 8", function (err, result) {
      if (err) console.log(err);
   });
   // query for real time panel 3.10
   electric.query("UPDATE real_time SET last_update = '" + update + "', loads = " + p310.data.p310 + ", current = " + p310.data.i310 + ", voltage = " + p310.data.v310 + ", frequency = " + p310.data.f310 + " WHERE id = 9", function (err, result) {
      if (err) console.log(err);
   });
   // query for real time panel 4.29
   electric.query("UPDATE real_time SET last_update = '" + update + "', loads = " + p429.data.p + ", current = " + p429.data.i + ", voltage = " + p429.data.v + ", frequency = " + p429.data.f + " WHERE id = 10", function (err, result) {
      if (err) console.log(err);
   });
   // query for real time UPS 2.02
   electric.query("UPDATE real_time SET last_update = '" + update + "', loads = " + ups2.data.p242 + ", current = " + ups2.data.i242 + ", voltage = " + ups2.data.v242 + ", frequency = " + ups2.data.f242 + " WHERE id = 11", function (err, result) {
      if (err) console.log(err);
   });
   // query for real time UPS 2.03
   electric.query("UPDATE real_time SET last_update = '" + update + "', loads = " + ups2.data.p243 + ", current = " + ups2.data.i243 + ", voltage = " + ups2.data.v243 + ", frequency = " + ups2.data.f243 + " WHERE id = 12", function (err, result) {
      if (err) console.log(err);
   });
   // query for real time UPS 3.01
   electric.query("UPDATE real_time SET last_update = '" + update + "', loads = " + ups3.data.pA + ", current = " + ups3.data.iA + ", voltage = " + ups3.data.vA + ", frequency = " + ups3.data.fA + " WHERE id = 13", function (err, result) {
      if (err) console.log(err);
   });
   // query for real time UPS 3.02
   electric.query("UPDATE real_time SET last_update = '" + update + "', loads = " + ups3.data.pB + ", current = " + ups3.data.iB + ", voltage = " + ups3.data.vB + ", frequency = " + ups3.data.fB + " WHERE id = 14", function (err, result) {
      if (err) console.log(err);
   });
   // query for real time UPS 5.01
   electric.query("UPDATE real_time SET last_update = '" + update + "', loads = " + ups5.data.p501 + ", current = " + ups5.data.i501 + ", voltage = " + ups5.data.v501 + ", frequency = " + ups5.data.f501 + " WHERE id = 15", function (err, result) {
      if (err) console.log(err);
   });
   // query for real time UPS 5.02
   electric.query("UPDATE real_time SET last_update = '" + update + "', loads = " + ups5.data.p502 + ", current = " + ups5.data.i502 + ", voltage = " + ups5.data.v502 + ", frequency = " + ups5.data.f502 + " WHERE id = 16", function (err, result) {
      if (err) console.log(err);
   });
};
 
const saveData = async () => {
   const lvmdp = await axios.get("http://192.168.10.13/data");
   
   const p205 = await axios.get("http://192.168.10.32/data");
   const p236 = await axios.get("http://192.168.10.33/data");
   const p305 = await axios.get("http://192.168.10.52/data");
   const p310 = await axios.get("http://192.168.10.55/data");
   const p429 = await axios.get("http://192.168.10.75/data");
 
   const ups2 = await axios.get("http://192.168.10.34/data");
   const ups3 = await axios.get("http://192.168.10.53/data");
   const ups5 = await axios.get("http://192.168.10.92/data");
 
   let pRecti = sum(parseFloat(p205.data.p), parseFloat(p236.data.p), parseFloat(p305.data.p305), parseFloat(p310.data.p310), parseFloat(p429.data.p));
   let iRecti = sum(parseFloat(p205.data.i), parseFloat(p236.data.i), parseFloat(p305.data.i305), parseFloat(p310.data.i310), parseFloat(p429.data.i));
   let vRecti = avg(parseFloat(p205.data.v), parseFloat(p236.data.v), parseFloat(p305.data.v305), parseFloat(p310.data.v310), parseFloat(p429.data.v));
   let fRecti = avg(parseFloat(p205.data.f), parseFloat(p236.data.f), parseFloat(p305.data.f305), parseFloat(p310.data.f310), parseFloat(p429.data.f));
 
   let pUPS = sum(parseFloat(ups2.data.p243), parseFloat(ups2.data.p242), parseFloat(ups3.data.pA), parseFloat(ups3.data.pB), parseFloat(ups5.data.p501), parseFloat(ups5.data.p502));
   let iUPS = sum(parseFloat(ups2.data.i243), parseFloat(ups2.data.i242), parseFloat(ups3.data.iA), parseFloat(ups3.data.iB), parseFloat(ups5.data.i501), parseFloat(ups5.data.i502));
   let vUPS = avg(parseFloat(ups2.data.v243), parseFloat(ups2.data.v242), parseFloat(ups3.data.vA), parseFloat(ups3.data.vB), parseFloat(ups5.data.v501), parseFloat(ups5.data.v502));
   let fUPS = avg(parseFloat(ups2.data.f243), parseFloat(ups2.data.f242), parseFloat(ups3.data.fA), parseFloat(ups3.data.fB), parseFloat(ups5.data.f501), parseFloat(ups5.data.f502));
 
   let pIt = sum(pRecti, pUPS);
   let iIt = sum(iRecti, iUPS);
   let vIt = avg(vRecti, vUPS);
   let fIt = avg(fRecti, fUPS);

   let facility = ((parseFloat(lvmdp.data.p)) - pIt).toFixed(2);

   let pue = ((parseFloat(lvmdp.data.p)) / pIt).toFixed(2);
 
   const d = new Date();
   let update = d.toLocaleString("sv-SE");

   // query for PUE table
   electric.query("INSERT INTO pue (updated_at, pue, it, facility) VALUES ('" + update + "'," + pue + "," + pIt + "," + facility + ")", function (err, result) {
		if (err) console.log(err);
	});
   // query for LVMDP table
   electric.query("INSERT INTO lvmdp (updated_at, loads, voltage, current, frequency) VALUES ('" + update + "'," + lvmdp.data.p + "," + lvmdp.data.v + "," + lvmdp.data.i + "," + lvmdp.data.f + ")", function (err, result) {
      if (err) console.log(err);
   });
   // query for IT table
   electric.query("INSERT INTO it (updated_at, loads, voltage, current, frequency) VALUES ('" + update + "'," + pIt + "," + vIt + "," + iIt + "," + fIt + ")", function (err, result) {
      if (err) console.log(err);
   });
   // query for Recti table
   electric.query("INSERT INTO recti (updated_at, loads, voltage, current, frequency) VALUES ('" + update + "'," + pRecti + "," + vRecti + "," + iRecti + "," + fRecti + ")", function (err, result) {
      if (err) console.log(err);
   });
   // query for UPS table
   electric.query("INSERT INTO ups (updated_at, loads, voltage, current, frequency) VALUES ('" + update + "'," + pUPS + "," + vUPS + "," + iUPS + "," + fUPS + ")", function (err, result) {
      if (err) console.log(err);
   });
   // query for Panel 2.05 table
   electric.query("INSERT INTO p205 (updated_at, loads, voltage, current, frequency) VALUES ('" + update + "'," + p205.data.p + "," + p205.data.v + "," + p205.data.i + "," + p205.data.f + ")", function (err, result) {
      if (err) console.log(err);
   });
   // query for Panel 2.36 table
   electric.query("INSERT INTO p236 (updated_at, loads, voltage, current, frequency) VALUES ('" + update + "'," + p236.data.p + "," + p236.data.v + "," + p236.data.i + "," + p236.data.f + ")", function (err, result) {
      if (err) console.log(err);
   });
   // query for Panel 3.05 table
   electric.query("INSERT INTO p305 (updated_at, loads, voltage, current, frequency) VALUES ('" + update + "'," + p305.data.p305+ "," + p305.data.v305+ "," + p305.data.i305+ "," + p305.data.f305+ ")", function (err, result) {
      if (err) console.log(err);
   });
   // query for Panel 3.10 table
   electric.query("INSERT INTO p310 (updated_at, loads, voltage, current, frequency) VALUES ('" + update + "'," + p310.data.p310 + "," + p310.data.v310 + "," + p310.data.i310 + "," + p310.data.f310 + ")", function (err, result) {
      if (err) console.log(err);
   });
   // query for Panel 4.29 table
   electric.query("INSERT INTO p429 (updated_at, loads, voltage, current, frequency) VALUES ('" + update + "'," + p429.data.p + "," + p429.data.v + "," + p429.data.i + "," + p429.data.f + ")", function (err, result) {
      if (err) console.log(err);
   });
   // query for UPS 2.02 table
   electric.query("INSERT INTO ups202 (updated_at, loads, voltage, current, frequency) VALUES ('" + update + "'," + ups2.data.p242 + "," + ups2.data.v242 + "," + ups2.data.i242 + "," + ups2.data.f242 + ")", function (err, result) {
      if (err) console.log(err);
   });
   // query for UPS 2.03 table
   electric.query("INSERT INTO ups203 (updated_at, loads, voltage, current, frequency) VALUES ('" + update + "'," + ups2.data.p243 + "," + ups2.data.v243 + "," + ups2.data.i243 + "," + ups2.data.f243 + ")", function (err, result) {
      if (err) console.log(err);
   });
   // query for UPS 3.01 table
   electric.query("INSERT INTO ups301 (updated_at, loads, voltage, current, frequency) VALUES ('" + update + "'," + ups3.data.pA + "," + ups3.data.vA + "," + ups3.data.iA + "," + ups3.data.fA + ")", function (err, result) {
      if (err) console.log(err);
   });
   // query for UPS 3.02 table
   electric.query("INSERT INTO ups302 (updated_at, loads, voltage, current, frequency) VALUES ('" + update + "'," + ups3.data.pB + "," + ups3.data.vB + "," + ups3.data.iB + "," + ups3.data.fB + ")", function (err, result) {
      if (err) console.log(err);
   });
   // query for UPS 5.01 table
   electric.query("INSERT INTO ups501 (updated_at, loads, voltage, current, frequency) VALUES ('" + update + "'," + ups5.data.p501 + "," + ups5.data.v501 + "," + ups5.data.i501 + "," + ups5.data.f501 + ")", function (err, result) {
      if (err) console.log(err);
   });
   // query for UPS 5.02 table
   electric.query("INSERT INTO ups502 (updated_at, loads, voltage, current, frequency) VALUES ('" + update + "'," + ups5.data.p502 + "," + ups5.data.v502 + "," + ups5.data.i502 + "," + ups5.data.f502 + ")", function (err, result) {
      if (err) console.log(err);
   });
};

module.exports =  { realTimeData, saveData, electric };