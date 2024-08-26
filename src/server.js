const { realTimeData, saveData, electric } = require('./electric');
const { lantai4RealTimeData, lantai4SaveData, temp } = require('./temp');
const { fuel, fuelSaveData } = require('./fuel')


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
  realTimeData();
  lantai4RealTimeData();
}, 1000);
setInterval(() => {
  saveData();
  lantai4SaveData();
}, 300000);
setInterval(fuelSaveData, 1800000)