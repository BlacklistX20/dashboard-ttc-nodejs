const { temp } = require('./dbConn');
const axios = require("axios");
const mysql = require("mysql");

// Function to fetch data from a URL
async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    return err;
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
  if (data instanceof Error) {
    temp.query(sqlDisconnect, ["D", id]);
  } else {
    const datetime = getDate();
    temp.query(sqlConnect, [datetime, data.sAvg, data.kAvg, "C", id]);
  }
}

module.exports = { fetchData, getDate, updateTempData }