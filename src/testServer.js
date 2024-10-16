const { lantai4RealTimeData, lantai4SaveData, temp } = require('./temp');
const { fuel, fuelSaveData } = require('./fuel');
const { conn, saveAllData } = require('./test');

conn.connect(function (err) {
  if (err) throw err;
  console.log("Electric Database Connected!");
});

temp.connect(function (err) {
  if (err) throw err;
  console.log("Temperature Database connected!");
});

fuel.connect(function (err) {
  if (err) throw err;
  console.log("Fuel Tank Database connected!");
});

setInterval(lantai4RealTimeData, 1000);
setInterval(() => {
  saveAllData();
  lantai4SaveData();
}, 300000);
setInterval(fuelSaveData, 1800000)