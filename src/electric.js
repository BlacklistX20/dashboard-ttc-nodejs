const axios = require("axios");
const mysql = require("mysql");

// MySQL Connection
const electric = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "power", // Update with your actual database name
});

// Function to fetch data from a URL
async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    return null;
  }
}

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

// Function to process PUE
async function calculatePue() {
  const urls = [
    "http://192.168.10.13/data",
    "http://192.168.10.32/data",
    "http://192.168.10.33/data",
    "http://192.168.10.52/data",
    "http://192.168.10.55/data",
    "http://192.168.10.75/data",
    "http://192.168.10.34/data",
    "http://192.168.10.53/data",
    "http://192.168.10.92/data",
    "http://192.168.10.93/data",
  ];

  const responses = await Promise.all(urls.map((url) => fetchData(url)));

  let fetchFailed = false; // Flag to track if any fetch fails
  let pSum = 0;

  responses.forEach((data, i) => {
    if (data) {
      if (i !== 0) { // Skip the first URL for `pSum`
        if (data.p) {
          pSum += parseFloat(data.p);
        } else if (data.pA && data.pB) {
          pSum += parseFloat(data.pA) + parseFloat(data.pB);
        }
      }
    } else {
      fetchFailed = true; // Mark failure if any fetch is null
    }
  });

  const dataLvmdp = responses[0]; // First URL's data
  const loadLvmdp = dataLvmdp ? parseFloat(dataLvmdp.p) : 0;

  const loadIt = pSum || 1; // Avoid division by zero
  const pue = loadLvmdp / loadIt;
  const loadFacility = loadLvmdp - loadIt;

  return { pue, loadLvmdp, loadIt, loadFacility, fetchFailed };
}

// Function to process IT
async function calculateIt() {
  const urls = [
    "http://192.168.10.32/data",
    "http://192.168.10.33/data",
    "http://192.168.10.52/data",
    "http://192.168.10.55/data",
    "http://192.168.10.75/data",
    "http://192.168.10.34/data",
    // "http://192.168.10.35/data",
    "http://192.168.10.53/data",
    // "http://192.168.10.54/data",
    "http://192.168.10.92/data",
    "http://192.168.10.93/data",
  ];

  const responses = await Promise.all(urls.map((url) => fetchData(url)));

  let fetchFailed = false; // Flag to track if any fetch fails
  let pSum = 0;
  let iSum = 0;
  let vSum = 0;
  let fSum = 0;
  let count = 0;

  responses.forEach((data, i) => {
    if (data) {
      if (data.p) {
        pSum += parseFloat(data.p);
        iSum += parseFloat(data.i);
        vSum += parseFloat(data.v);
        fSum += parseFloat(data.f);
        count++;
      } else if (data.pA && data.pB) {
        pSum += parseFloat(data.pA) + parseFloat(data.pB);
        iSum += parseFloat(data.iA) + parseFloat(data.iB);
        vSum += parseFloat(data.vA) + parseFloat(data.vB);
        fSum += parseFloat(data.fA) + parseFloat(data.fB);
        count += 2; // Since we have two sets of data for this address
      }
    } else {
      fetchFailed = true; // Mark failure if any fetch is null
    }
  });

  const vAvg = vSum / count;
  const fAvg = fSum / count;

  return { pSum, iSum, vAvg, fAvg, fetchFailed };
}

// Function to process Recti
async function calculateRecti() {
  const urls = [
    "http://192.168.10.32/data",
    "http://192.168.10.33/data",
    "http://192.168.10.52/data",
    "http://192.168.10.55/data",
    "http://192.168.10.75/data",
  ];

  const responses = await Promise.all(urls.map((url) => fetchData(url)));

  let fetchFailed = false; // Flag to track if any fetch fails
  let pRecti = 0;
  let iSum = 0;
  let vSum = 0;
  let fSum = 0;
  let count = 0;

  responses.forEach((data, i) => {
    if (data) {
      pRecti += parseFloat(data.p);
      iSum += parseFloat(data.i);
      vSum += parseFloat(data.v);
      fSum += parseFloat(data.f);
      count++;
    } else {
      fetchFailed = true; // Mark failure if any fetch is null
    }
  });

  const vAvg = vSum / count;
  const fAvg = fSum / count;

  return { pRecti, iSum, vAvg, fAvg, fetchFailed };
}

// Function to process UPS
async function calculateUps() {
  const urls = [
    "http://192.168.10.34/data",
    // "http://192.168.10.35/data",
    "http://192.168.10.53/data",
    // "http://192.168.10.54/data",
    "http://192.168.10.92/data",
    "http://192.168.10.93/data",
  ];

  const responses = await Promise.all(urls.map((url) => fetchData(url)));

  let fetchFailed = false; // Flag to track if any fetch fails
  let pUps = 0;
  let iSum = 0;
  let vSum = 0;
  let fSum = 0;
  let count = 0;

  responses.forEach((data, i) => {
    if (data) {
      if (data.p) {
        pUps += parseFloat(data.p);
        iSum += parseFloat(data.i);
        vSum += parseFloat(data.v);
        fSum += parseFloat(data.f);
        count++;
      } else if (data.pA && data.pB) {
        pUps += parseFloat(data.pA) + parseFloat(data.pB);
        iSum += parseFloat(data.iA) + parseFloat(data.iB);
        vSum += parseFloat(data.vA) + parseFloat(data.vB);
        fSum += parseFloat(data.fA) + parseFloat(data.fB);
        count += 2; // Since we have two sets of data for this address
      }
    } else {
      fetchFailed = true; // Mark failure if any fetch is null
    }
  });

  const vAvg = vSum / count;
  const fAvg = fSum / count;

  return { pUps, iSum, vAvg, fAvg };
}

// Save pue data
async function savePue() {
  const { pue, loadLvmdp, loadIt, loadFacility } = await calculatePue();
  const { pRecti } = await calculateRecti;
  const { pUps } = await calculateUps;
  const datetime = getDate();
  const sql = `INSERT INTO pue (updated_at, pue, lvmdp, recti, ups, it, facility) VALUES (?, ?, ?, ?. ?, ?, ?)`;
  electric.query(sql, [datetime, pue, loadLvmdp, pRecti, pUps, loadIt, loadFacility], (err) => {
    if (err) {
      console.error("Error inserting into PUE table:", err);
    }
  });
}

// Save IT data
async function saveIt() {
  const { pSum, iSum, vAvg, fAvg } = await calculateIt();
  const datetime = getDate();
  const sql = `INSERT INTO it (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;
  electric.query(sql, [datetime, pSum, vAvg, iSum, fAvg], (err) => {
    if (err) {
      console.error("Error inserting into IT table:", err);
    }
  });
}

// Save recti data
async function saveRecti() {
  const { pRecti, iSum, vAvg, fAvg } = await calculateRecti();
  const datetime = getDate();
  const sql = `INSERT INTO recti (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;
  electric.query(sql, [datetime, pRecti, vAvg, iSum, fAvg], (err) => {
    if (err) {
      console.error("Error inserting into Recti table:", err);
    }
  });
}

// Save UPS data
async function saveUps() {
  const { pUps, iSum, vAvg, fAvg } = await calculateUps();
  const datetime = getDate();
  const sql = `INSERT INTO ups (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;
  electric.query(sql, [datetime, pUps, vAvg, iSum, fAvg], (err) => {
    if (err) {
      console.error("Error inserting into UPS table:", err);
    }
  });
}

async function saveData(url, name) {
  const data = await fetchData(url);
  if (data) {
    const datetime = getDate();
    const sql = `INSERT INTO ${name} (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;
    electric.query(sql, [datetime, data.p, data.v, data.i, data.f], (err) => {
      if (err) {
        console.error(`Error inserting into ${name}:`, err);
      }
    });
  }
}

// Save data for ups2.02
async function saveUps202() {
  const data = await fetchData("http://192.168.10.34/data");
  if (data) {
    const datetime = getDate();
    const sql = `INSERT INTO ups202 (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;
    electric.query(sql, [datetime, data.pA, data.vA, data.iA, data.fA], (err) => {
      if (err) {
        console.error("Error inserting into UPS 2.02 table:", err);
      }
    });
  }
}

// Save data for ups2.03
async function saveUps203() {
  const data = await fetchData("http://192.168.10.34/data");
  if (data) {
    const datetime = getDate();
    const sql = `INSERT INTO ups203 (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;
    electric.query(sql, [datetime, data.pB, data.vB, data.iB, data.fB], (err) => {
      if (err) {
        console.error("Error inserting into UPS 2.03 table:", err);
      }
    });
  }
}

// Save data for ups3.01
async function saveUps301() {
  const data = await fetchData("http://192.168.10.53/data");
  if (data) {
    const datetime = getDate();
    const sql = `INSERT INTO ups301 (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;
    electric.query(sql, [datetime, data.pA, data.vA, data.iA, data.fA], (err) => {
      if (err) {
        console.error("Error inserting into UPS 3.01 table:", err);
      }
    });
  }
}

// Save data for ups3.02
async function saveUps302() {
  const data = await fetchData("http://192.168.10.53/data");
  if (data) {
    const datetime = getDate();
    const sql = `INSERT INTO ups302 (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;
    electric.query(sql, [datetime, data.pB, data.vB, data.iB, data.fB], (err) => {
      if (err) {
        console.error("Error inserting into UPS 3.02 table:", err);
      }
    });
  }
}

// Real Time pue
async function updatePue() {
  const { pue, fetchFailed } = await calculatePue();
  const datetime = getDate();
  const status = fetchFailed ? "D" : "C"; // Set status based on fetch failures
  const sql = `UPDATE per_second SET last_update = ?, loads = ?, current = 0, voltage = 0, frequency = 0, status = ? WHERE id = 1`;
  electric.query(sql, [datetime, pue, status]);
}

const sql = `UPDATE per_second SET last_update = ?, loads = ?, current = ?, voltage = ?, frequency = ?, status = ? WHERE id = ?`;
const sql2 = `UPDATE per_second SET status = ? WHERE id = ?`

async function updateData(url, id) {
  const data = await fetchData(url);
  if (data) {
    const datetime = getDate();
    electric.query(sql, [datetime, data.p, data.i, data.v, data.f, "C", id]);
  } else {
    electric.query(sql2, ["D", id]);
  }
}

// Real Time IT
async function updateIt() {
  const { pSum, iSum, vAvg, fAvg, fetchFailed } = await calculateIt();
  const datetime = getDate();
  const status = fetchFailed ? "D" : "C"; // Set status based on fetch failures
  electric.query(sql, [datetime, pSum, iSum, vAvg, fAvg, status, 3]);
}

// Real Time recti
async function updateRecti() {
  const { pRecti, iSum, vAvg, fAvg, fetchFailed } = await calculateRecti();
  const datetime = getDate();
  const status = fetchFailed ? "D" : "C"; // Set status based on fetch failures
  electric.query(sql, [datetime, pRecti, iSum, vAvg, fAvg, status, 4]);
}

// Real Time UPS
async function updateUps() {
  const { pUps, iSum, vAvg, fAvg, fetchFailed } = await calculateUps();
  const datetime = getDate();
  const status = fetchFailed ? "D" : "C"; // Set status based on fetch failures
  electric.query(sql, [datetime, pUps, iSum, vAvg, fAvg, status, 5]);
}

// Real Time UPS 2.02
async function updateUps202() {
  const data = await fetchData("http://192.168.10.34/data");
  if (data) {
    const datetime = getDate();
    electric.query(sql, [datetime, data.pA, data.iA, data.vA, data.fA, "C", 11]);
  } else {
    electric.query(sql2, ["D", 11]);
  }
}

// Real Time UPS 2.03
async function updateUps203() {
  const data = await fetchData("http://192.168.10.34/data");
  if (data) {
    const datetime = getDate();
    electric.query(sql, [datetime, data.pB, data.iB, data.vB, data.fB, "C", 12]);
  } else {
    electric.query(sql2, ["D", 12]);
  }
}

// Real Time UPS 3.01
async function updateUps301() {
  const data = await fetchData("http://192.168.10.53/data");
  if (data) {
    const datetime = getDate();
    electric.query(sql, [datetime, data.pA, data.iA, data.vA, data.fA, "C", 13]);
  } else {
    electric.query(sql2, ["D", 13]);
  }
}

// Real Time UPS 3.02
async function updateUps302() {
  const data = await fetchData("http://192.168.10.53/data");
  if (data) {
    const datetime = getDate();
    electric.query(sql, [datetime, data.pB, data.iB, data.vB, data.fB, "C", 14]);
  } else {
    electric.query(sql2, ["D", 14]);
  }
}

// Save all data simultaneously
async function saveElecData() {
  await savePue();
  await saveData("http://192.168.10.13/data", "lvmdp");
  await saveIt();
  await saveRecti();
  await saveUps();
  await saveData("http://192.168.10.32/data", "p205");
  await saveData("http://192.168.10.33/data", "p236");
  await saveData("http://192.168.10.55/data", "p310");
  await saveData("http://192.168.10.52/data", "p305");
  await saveData("http://192.168.10.75/data", "p429");
  await saveUps202();
  await saveUps203();
  await saveUps301();
  await saveUps302();
  await saveData("http://192.168.10.92/data", "ups501");
  await saveData("http://192.168.10.93/data", "ups502");
}

async function updateElecData() {
  await updatePue();
  await updateData("http://192.168.10.13/data", 2);
  await updateIt();
  await updateRecti();
  await updateUps();
  await updateData("http://192.168.10.32/data", 6);
  await updateData("http://192.168.10.33/data", 7);
  await updateData("http://192.168.10.52/data", 8);
  await updateData("http://192.168.10.55/data", 9);
  await updateData("http://192.168.10.75/data", 10);
  await updateUps202();
  await updateUps203();
  await updateUps301();
  await updateUps302();
  await updateData("http://192.168.10.92/data", 15);
  await updateData("http://192.168.10.93/data", 16);
}

module.exports = { electric, saveElecData, updateElecData };
