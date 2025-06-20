const { temp } = require('./dbConn');
const axios = require("axios");
const mysql = require("mysql2");

require('dotenv').config();

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
function getDateTime() {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');

  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
         `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

// Function to update Temperature Data data
async function updateTempData(url, id) {
  const sqlConnect = `UPDATE per_second SET last_update = ?, temp = ?, hum = ?, status = ? WHERE id = ?`;
  const sqlDisconnect = `UPDATE per_second SET status = ? WHERE id = ?`;
  const data = await fetchData(url);
  if (data.status == 200) {
    const datetime = getDateTime();
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

async function fetchWithRetry(url) {
  const response = await fetchData(url);

  if (response.status === 200) {
    return response;
  }

  if (response.status === 429) {
    console.warn("Received 429. Waiting 3 minute before retry...");
    await new Promise((resolve) => setTimeout(resolve, 180000)); // 1 minute
    const retryResponse = await fetchData(url);

    if (retryResponse.status === 200) {
      return retryResponse;
    }

    throw new Error("Still receiving 429 after retry.");
  }

  throw new Error(`Fetch failed with status ${response.status}`);
}

module.exports = { fetchData, getDateTime, updateTempData, fetchWithRetry }