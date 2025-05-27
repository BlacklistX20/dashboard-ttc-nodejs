const { temp, electric, fuel } = require('./dbConn');
const { saveElecData, updateElecData } = require('./electric');
const { saveLt2, updateLt2 } = require('./temp2');
const { saveLt3, updateLt3 } = require('./temp3');
const { saveLt4, updateLt4 } = require('./temp4');
const { saveLt5, updateLt5 } = require('./temp5');
const { saveDaily, updateDaily, saveMonthly, updateMonthly } = require('./fuel');
require('dotenv').config();

async function testConnections() {
  try {
    await electric.query('SELECT 1');
    console.log('Electric Database connected!');
    await temp.query('SELECT 1');
    console.log('Temperature Database connected!');
    await fuel.query('SELECT 1');
    console.log('Fuel Tank Database connected!');
  } catch (err) {
    console.error('Database connection test failed:', err);
  }
}

testConnections();

setInterval(() => {
  updateElecData();
  updateDaily();
  updateMonthly();
  updateLt2();
  updateLt3();
  updateLt4();
  updateLt5();
}, 1000);
setInterval(() => {
  saveElecData();
  saveLt2();
  saveLt3();
  saveLt4();
  saveLt5();
  // saveDaily();
  saveMonthly();
}, 300000);
setInterval(saveDaily, 1800000)
// setInterval(saveMonthly, 3600000)