const axios = require("axios");
const mysql = require("mysql");

// MySQL Connection
const conn = mysql.createConnection({
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
    console.error(`Error fetching data from ${url}:`, err);
    return null;
  }
}

// Function to process PUE
async function calculatePue() {
  const urlsP = [
    "http://192.168.10.13/data",
    "http://192.168.10.32/data",
    "http://192.168.10.33/data",
    "http://192.168.10.52/data",
    "http://192.168.10.55/data",
    "http://192.168.10.75/data",
    "http://192.168.10.34/data",
    "http://192.168.10.35/data",
    "http://192.168.10.53/data",
    "http://192.168.10.54/data",
    "http://192.168.10.92/data",
    "http://192.168.10.93/data",
  ];

  let pSum = 0;

  // Excluding the first URL from the summing process
  for (let i = 1; i < urlsP.length; i++) {
    const data = await fetchData(urlsP[i]);
    if (data) {
      pSum += parseFloat(data.p);
    }
  }

  // Fetching data from lvmdp
  const dataLvmdp = await fetchData("http://192.168.10.13/data");
  const loadLvmdp = dataLvmdp ? parseFloat(dataLvmdp.p) : 0;

  // Calculate loadIt, pue, loadFacility
  const loadIt = pSum;
  const pue = loadLvmdp / loadIt;
  const loadFacility = pFrom13 - loadIt;

  return { pue, loadLvmdp, loadIt, loadFacility };
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
    "http://192.168.10.35/data",
    "http://192.168.10.53/data",
    "http://192.168.10.54/data",
    "http://192.168.10.92/data",
    "http://192.168.10.93/data",
  ];

  let pSum = 0;
  let iSum = 0;
  let vSum = 0;
  let fSum = 0;
  let count = 0;

  for (const url of urls) {
    const data = await fetchData(url);
    if (data) {
      pSum += parseFloat(data.p);
      iSum += parseFloat(data.i);
      vSum += parseFloat(data.v);
      fSum += parseFloat(data.f);
      count++;
    }
  }

  const vAvg = vSum / count;
  const fAvg = fSum / count;

  return { pSum, iSum, vAvg, fAvg };
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

  let pSum = 0;
  let iSum = 0;
  let vSum = 0;
  let fSum = 0;
  let count = 0;

  for (const url of urls) {
    const data = await fetchData(url);
    if (data) {
      pSum += parseFloat(data.p);
      iSum += parseFloat(data.i);
      vSum += parseFloat(data.v);
      fSum += parseFloat(data.f);
      count++;
    }
  }

  const vAvg = vSum / count;
  const fAvg = fSum / count;

  return { pSum, iSum, vAvg, fAvg };
}

// Function to process UPS
async function calculateUps() {
  const urls = [
    "http://192.168.10.34/data",
    "http://192.168.10.35/data",
    "http://192.168.10.53/data",
    "http://192.168.10.54/data",
    "http://192.168.10.92/data",
    "http://192.168.10.93/data",
  ];

  let pSum = 0;
  let iSum = 0;
  let vSum = 0;
  let fSum = 0;
  let count = 0;

  for (const url of urls) {
    const data = await fetchData(url);
    if (data) {
      pSum += parseFloat(data.p);
      iSum += parseFloat(data.i);
      vSum += parseFloat(data.v);
      fSum += parseFloat(data.f);
      count++;
    }
  }

  const vAvg = vSum / count;
  const fAvg = fSum / count;

  return { pSum, iSum, vAvg, fAvg };
}

// Save pue data
async function savePue() {
  const { pue, loadLvmdp, loadIt, loadFacility } = await calculatePue();

  const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");

  const sql = `INSERT INTO pue (updated_at, pue, it, facility) VALUES (?, ?, ?, ?)`;

  conn.query(sql, [datetime, pue, loadIt, loadFacility], (err) => {
    if (err) {
      console.error("Error inserting into pue:", err);
    } else {
      console.log("Data inserted into pue table");
    }
  });
}

// Save IT data
async function saveIt() {
  const { pSum, iSum, vAvg, fAvg } = await calculateIt();

  const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");

  const sql = `INSERT INTO it (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;

  conn.query(sql, [datetime, pSum, vAvg, iSum, fAvg], (err) => {
    if (err) {
      console.error("Error inserting into IT table:", err);
    } else {
      console.log("Data inserted into IT table");
    }
  });
}

// Save recti data
async function saveRecti() {
  const { pSum, iSum, vAvg, fAvg } = await calculateRecti();

  const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");

  const sql = `INSERT INTO recti (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;

  conn.query(sql, [datetime, pSum, vAvg, iSum, fAvg], (err) => {
    if (err) {
      console.error("Error inserting into Recti table:", err);
    } else {
      console.log("Data inserted into Recti table");
    }
  });
}

// Save UPS data
async function saveUps() {
  const { pSum, iSum, vAvg, fAvg } = await calculateUps();

  const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");

  const sql = `INSERT INTO ups (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;

  conn.query(sql, [datetime, pSum, vAvg, iSum, fAvg], (err) => {
    if (err) {
      console.error("Error inserting into UPS table:", err);
    } else {
      console.log("Data inserted into UPS table");
    }
  });
}

// Save data for lvmdp
async function saveLvmdp() {
  const data = await fetchData("http://192.168.10.13/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    const sql = `INSERT INTO lvmdp (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;
    conn.query(sql, [datetime, data.p, data.v, data.i, data.f], (err) => {
      if (err) {
        console.error("Error inserting into lvmdp:", err);
      } else {
        console.log("Data inserted into lvmdp");
      }
    });
  }
}

// Save data for panel205
async function savePanel205() {
  const data = await fetchData("http://192.168.10.32/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    const sql = `INSERT INTO p205 (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;
    conn.query(sql, [datetime, data.p, data.v, data.i, data.f], (err) => {
      if (err) {
        console.error("Error inserting into panel205:", err);
      } else {
        console.log("Data inserted into panel205");
      }
    });
  }
}

// Save data for panel236
async function savePanel236() {
  const data = await fetchData("http://192.168.10.33/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    const sql = `INSERT INTO p236 (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;
    conn.query(sql, [datetime, data.p, data.v, data.i, data.f], (err) => {
      if (err) {
        console.error("Error inserting into panel236:", err);
      } else {
        console.log("Data inserted into panel236");
      }
    });
  }
}

// Save data for panel310
async function savePanel310() {
  const data = await fetchData("http://192.168.10.55/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    const sql = `INSERT INTO p310 (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;
    conn.query(sql, [datetime, data.p, data.v, data.i, data.f], (err) => {
      if (err) {
        console.error("Error inserting into panel310:", err);
      } else {
        console.log("Data inserted into panel310");
      }
    });
  }
}

// Save data for panel305
async function savePanel305() {
  const data = await fetchData("http://192.168.10.52/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    const sql = `INSERT INTO p305 (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;
    conn.query(sql, [datetime, data.p, data.v, data.i, data.f], (err) => {
      if (err) {
        console.error("Error inserting into panel305:", err);
      } else {
        console.log("Data inserted into panel305");
      }
    });
  }
}

// Save data for panel429
async function savePanel429() {
  const data = await fetchData("http://192.168.10.75/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    const sql = `INSERT INTO p429 (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;
    conn.query(sql, [datetime, data.p, data.v, data.i, data.f], (err) => {
      if (err) {
        console.error("Error inserting into panel429:", err);
      } else {
        console.log("Data inserted into panel429");
      }
    });
  }
}

// Save data for ups2.02
async function saveUps202() {
  const data = await fetchData("http://192.168.10.34/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    const sql = `INSERT INTO ups202 (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;
    conn.query(sql, [datetime, data.p, data.v, data.i, data.f], (err) => {
      if (err) {
        console.error("Error inserting into UPS 2.02 table:", err);
      } else {
        console.log("Data inserted into UPS 2.02 table");
      }
    });
  }
}

// Save data for ups2.03
async function saveUps203() {
  const data = await fetchData("http://192.168.10.35/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    const sql = `INSERT INTO ups203 (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;
    conn.query(sql, [datetime, data.p, data.v, data.i, data.f], (err) => {
      if (err) {
        console.error("Error inserting into UPS 2.03 table:", err);
      } else {
        console.log("Data inserted into UPS 2.03 table");
      }
    });
  }
}

// Save data for ups3.01
async function saveUps301() {
  const data = await fetchData("http://192.168.10.53/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    const sql = `INSERT INTO ups301 (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;
    conn.query(sql, [datetime, data.p, data.v, data.i, data.f], (err) => {
      if (err) {
        console.error("Error inserting into UPS 3.01 table:", err);
      } else {
        console.log("Data inserted into UPS 3.01 table");
      }
    });
  }
}

// Save data for ups3.02
async function saveUps302() {
  const data = await fetchData("http://192.168.10.54/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    const sql = `INSERT INTO ups302 (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;
    conn.query(sql, [datetime, data.p, data.v, data.i, data.f], (err) => {
      if (err) {
        console.error("Error inserting into UPS 3.02 table:", err);
      } else {
        console.log("Data inserted into UPS 3.02 table");
      }
    });
  }
}

// Save data for ups5.01
async function saveUps501() {
  const data = await fetchData("http://192.168.10.92/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    const sql = `INSERT INTO ups501 (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;
    conn.query(sql, [datetime, data.p, data.v, data.i, data.f], (err) => {
      if (err) {
        console.error("Error inserting into UPS 5.01 table:", err);
      } else {
        console.log("Data inserted into UPS 5.01 table");
      }
    });
  }
}

// Save data for ups5.02
async function saveUps502() {
  const data = await fetchData("http://192.168.10.93/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    const sql = `INSERT INTO ups502 (updated_at, loads, voltage, current, frequency) VALUES (?, ?, ?, ?, ?)`;
    conn.query(sql, [datetime, data.p, data.v, data.i, data.f], (err) => {
      if (err) {
        console.error("Error inserting into UPS 5.02 table:", err);
      } else {
        console.log("Data inserted into UPS 5.02 table");
      }
    });
  }
}

// Real Time pue
async function rtPue() {
  const { pue } = await calculatePue();

  const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");

  const sql = `UPDATE real_time SET last_update = ?, loads = ?, current = 0, voltage = 0, frequency = 0 WHERE id = 1`;

  conn.query(sql, [datetime, pue]);
}

const sql = `UPDATE real_time SET last_update = ?, loads = ?, current = ?, voltage = ?, frequency = ? WHERE id = ?`;

// Real Time lvmdp
async function rtLvmdp() {
  const data = await fetchData("http://192.168.10.13/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");

    conn.query(sql, [datetime, data.p, data.i, data.v, data.f, 2]);
  }
}

// Real Time IT
async function rtIt() {
  const { pSum, iSum, vAvg, fAvg } = await calculateIt();

  const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");

  conn.query(sql, [datetime, pSum, iSum, vAvg, fAvg, 3]);
}

// Real Time recti
async function rtRecti() {
  const { pSum, iSum, vAvg, fAvg } = await calculateRecti();

  const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");

  conn.query(sql, [datetime, pSum, iSum, vAvg, fAvg, 4]);
}

// Real Time UPS
async function rtUps() {
  const { pSum, iSum, vAvg, fAvg } = await calculateUps();

  const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");

  conn.query(sql, [datetime, pSum, iSum, vAvg, fAvg, 5]);
}

// Real Time Panel 2.05
async function rtP205() {
  const data = await fetchData("http://192.168.10.32/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    conn.query(sql, [datetime, data.p, data.i, data.v, data.f, 6]);
  }
}

// Real Time Panel 2.36
async function rtP236() {
  const data = await fetchData("http://192.168.10.33/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    conn.query(sql, [datetime, data.p, data.i, data.v, data.f, 7]);
  }
}

// Real Time Panel 3.05
async function rtP305() {
  const data = await fetchData("http://192.168.10.52/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    conn.query(sql, [datetime, data.p, data.i, data.v, data.f, 8]);
  }
}

// Real Time Panel 3.10
async function rtP310() {
  const data = await fetchData("http://192.168.10.55/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    conn.query(sql, [datetime, data.p, data.i, data.v, data.f, 9]);
  }
}

// Real Time Panel 4.29
async function rtP429() {
  const data = await fetchData("http://192.168.10.75/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    conn.query(sql, [datetime, data.p, data.i, data.v, data.f, 10]);
  }
}

// Real Time UPS 2.02
async function rtUps202() {
  const data = await fetchData("http://192.168.10.34/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    conn.query(sql, [datetime, data.p, data.i, data.v, data.f, 11]);
  }
}

// Real Time UPS 2.03
async function rtUps203() {
  const data = await fetchData("http://192.168.10.35/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    conn.query(sql, [datetime, data.p, data.i, data.v, data.f, 12]);
  }
}

// Real Time UPS 3.01
async function rtUps301() {
  const data = await fetchData("http://192.168.10.53/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    conn.query(sql, [datetime, data.p, data.i, data.v, data.f, 13]);
  }
}

// Real Time UPS 3.02
async function rtUps302() {
  const data = await fetchData("http://192.168.10.54/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    conn.query(sql, [datetime, data.p, data.i, data.v, data.f, 14]);
  }
}

// Real Time UPS 5A
async function rtUps501() {
  const data = await fetchData("http://192.168.10.92/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    conn.query(sql, [datetime, data.p, data.i, data.v, data.f, 15]);
  }
}

// Real Time UPS 5B
async function rtUps502() {
  const data = await fetchData("http://192.168.10.93/data");
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    conn.query(sql, [datetime, data.p, data.i, data.v, data.f, 16]);
  }
}

// Save all data simultaneously
async function saveAllData() {
  await saveLvmdp();
  await saveIt();
  await saveRecti();
  await saveUps();
  await savePanel205();
  await savePanel236();
  await savePanel310();
  await savePanel305();
  await savePanel429();
  await saveUps202();
  await saveUps203();
  await saveUps301();
  await saveUps302();
  await saveUps501();
  await saveUps502();
  await savePue();
}

async function saveRealTimeData() {
  rtPue();
  rtLvmdp();
  rtIt();
  rtRecti();
  rtUps();
  rtP205();
  rtP236();
  rtP305();
  rtP310();
  rtP429();
  rtUps202();
  rtUps203();
  rtUps301();
  rtUps302();
  rtUps501();
  rtUps502();
}

module.exports = { conn, saveAllData, saveRealTimeData };
