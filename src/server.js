const { temp, electric, fuel } = require('./dbConn');
const { saveElecData, updateElecData } = require('./electric');
const { saveLt2, updateLt2 } = require('./temp2');
const { saveLt3, updateLt3 } = require('./temp3');
const { saveLt4, updateLt4 } = require('./temp4');
const { saveLt5, updateLt5 } = require('./temp5');
const { saveDaily, updateDaily } = require('./fuel');

electric.connect(function (err) {
  if (err) throw err;
  console.log("Electric Database connected!");
});

temp.connect(function (err) {
  if (err) throw err;
  console.log("Temperature Database connected!");
});

fuel.connect(function (err) {
  if (err) throw err;
  console.log("Fuel Tank Database connected!");
});

setInterval(() => {
  updateElecData();
  updateDaily();
}, 1000);
setInterval(() => {
  updateLt2();
  updateLt3();
  updateLt4();
  updateLt5();
}, 3000);
setInterval(() => {
  saveElecData();
  saveLt2();
  saveLt3();
  saveLt4();
  saveLt5();
}, 300000);
setInterval(saveDaily, 1800000)