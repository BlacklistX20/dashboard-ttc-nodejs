const { temp } = require('./dbConn');
const axios = require("axios");
const mysql = require("mysql");

// Function to fetch data from a URL
async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response;
  } catch (err) {
    const response = err;
    return response;
  }
}

// Function to get date with Datetime Format
function getDate() {
  const d = new Date();
  const options = {
    year: 'numeric', month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  return d.toLocaleString('en-CA', options).replace(',', '');
}

// Function to update Temperature Data data
async function updateTempData(url, id) {
  const sqlConnect = `UPDATE per_second SET last_update = ?, temp = ?, hum = ?, status = ? WHERE id = ?`;
  const sqlDisconnect = `UPDATE per_second SET status = ? WHERE id = ?`;
  const data = await fetchData(url);
  if (data.status == 200) {
    const datetime = getDate();
    const tempValue = data.data.sAvg ?? 0; // Nullish coalescing operator
    const humValue = data.data.kAvg ?? 0;
    // console.log(tempValue);
    temp.query(sqlConnect, [datetime, tempValue, humValue, "C", id]);
  } else if (data.status == 429) {
    // console.log("tunggu");
    temp.query(sqlDisconnect, ["C", id]);
  } else {
    // console.log("Disconnect");
    temp.query(sqlDisconnect, ["D", id]);
  }
}

module.exports = { fetchData, getDate, updateTempData }