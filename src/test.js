const fetch = require('node-fetch');
const mysql = require('mysql');

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'your_database' // Update with your actual database name
});

// Function to fetch data from a URL
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error fetching data from ${url}:`, err);
    return null;
  }
}

// Function to process pue, loadIt, and loadFacility
async function processMetrics() {
  const urlsP = [
    'https://192.168.10.13/data',
    'https://192.168.10.32/data',
    'https://192.168.10.33/data',
    'https://192.168.10.51/data',
    'https://192.168.10.52/data',
    'https://192.168.10.75/data'
  ];

  const urlsPA = [
    'https://192.168.10.34/data',
    'https://192.168.10.53/data',
    'https://192.168.10.92/data'
  ];

  let pSum = 0;

  // Excluding the first URL from the summing process
  for (let i = 1; i < urlsP.length; i++) {
    const data = await fetchData(urlsP[i]);
    if (data) {
      pSum += parseFloat(data.p);
    }
  }

  // Adding pA and pB values from the second group of URLs
  for (const url of urlsPA) {
    const data = await fetchData(url);
    if (data) {
      pSum += parseFloat(data.pA);
      pSum += parseFloat(data.pB);
    }
  }

  // Fetching data from https://192.168.10.13/data
  const dataFrom13 = await fetchData('https://192.168.10.13/data');
  const pFrom13 = dataFrom13 ? parseFloat(dataFrom13.p) : 0;

  // Calculate loadIt, pue, loadFacility
  const loadIt = pSum;
  const pue = pFrom13 / loadIt;
  const loadFacility = pFrom13 - loadIt;

  return { loadIt, pue, loadFacility };
}

// Save metrics (pue, loadIt, loadFacility)
async function saveMetrics() {
  const { loadIt, pue, loadFacility } = await processMetrics();

  const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const sql = `INSERT INTO metrics (datetime, pue_value, loadIt_value, loadFacility_value) VALUES (?, ?, ?, ?)`;

  connection.query(
    sql,
    [datetime, pue, loadIt, loadFacility],
    (err) => {
      if (err) {
        console.error('Error inserting into metrics:', err);
      } else {
        console.log('Metrics inserted into metrics table');
      }
    }
  );
}

// Save data for lvmdp (https://192.168.10.13/data)
async function saveLvmdp() {
  const data = await fetchData('https://192.168.10.13/data');
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sql = `INSERT INTO lvmdp (datetime, p_value, v_value, i_value, f_value) VALUES (?, ?, ?, ?, ?)`;
    connection.query(
      sql,
      [datetime, data.p, data.v, data.i, data.f],
      (err) => {
        if (err) {
          console.error('Error inserting into lvmdp:', err);
        } else {
          console.log('Data inserted into lvmdp');
        }
      }
    );
  }
}

// Save data for panel205 (https://192.168.10.32/data)
async function savePanel205() {
  const data = await fetchData('https://192.168.10.32/data');
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sql = `INSERT INTO panel205 (datetime, p_value, v_value, i_value, f_value) VALUES (?, ?, ?, ?, ?)`;
    connection.query(
      sql,
      [datetime, data.p, data.v, data.i, data.f],
      (err) => {
        if (err) {
          console.error('Error inserting into panel205:', err);
        } else {
          console.log('Data inserted into panel205');
        }
      }
    );
  }
}

// Save data for panel236 (https://192.168.10.33/data)
async function savePanel236() {
  const data = await fetchData('https://192.168.10.33/data');
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sql = `INSERT INTO panel236 (datetime, p_value, v_value, i_value, f_value) VALUES (?, ?, ?, ?, ?)`;
    connection.query(
      sql,
      [datetime, data.p, data.v, data.i, data.f],
      (err) => {
        if (err) {
          console.error('Error inserting into panel236:', err);
        } else {
          console.log('Data inserted into panel236');
        }
      }
    );
  }
}

// Save data for panel310 (https://192.168.10.51/data)
async function savePanel310() {
  const data = await fetchData('https://192.168.10.51/data');
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sql = `INSERT INTO panel310 (datetime, p_value, v_value, i_value, f_value) VALUES (?, ?, ?, ?, ?)`;
    connection.query(
      sql,
      [datetime, data.p, data.v, data.i, data.f],
      (err) => {
        if (err) {
          console.error('Error inserting into panel310:', err);
        } else {
          console.log('Data inserted into panel310');
        }
      }
    );
  }
}

// Save data for panel305 (https://192.168.10.52/data)
async function savePanel305() {
  const data = await fetchData('https://192.168.10.52/data');
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sql = `INSERT INTO panel305 (datetime, p_value, v_value, i_value, f_value) VALUES (?, ?, ?, ?, ?)`;
    connection.query(
      sql,
      [datetime, data.p, data.v, data.i, data.f],
      (err) => {
        if (err) {
          console.error('Error inserting into panel305:', err);
        } else {
          console.log('Data inserted into panel305');
        }
      }
    );
  }
}

// Save data for panel429 (https://192.168.10.75/data)
async function savePanel429() {
  const data = await fetchData('https://192.168.10.75/data');
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sql = `INSERT INTO panel429 (datetime, p_value, v_value, i_value, f_value) VALUES (?, ?, ?, ?, ?)`;
    connection.query(
      sql,
      [datetime, data.p, data.v, data.i, data.f],
      (err) => {
        if (err) {
          console.error('Error inserting into panel429:', err);
        } else {
          console.log('Data inserted into panel429');
        }
      }
    );
  }
}

// Save data for ups2 (https://192.168.10.34/data)
async function saveUps2() {
  const data = await fetchData('https://192.168.10.34/data');
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sql = `INSERT INTO ups2 (datetime, pA_value, vA_value, iA_value, fA_value, pB_value, vB_value, iB_value, fB_value) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(
      sql,
      [datetime, data.pA, data.vA, data.iA, data.fA, data.pB, data.vB, data.iB, data.fB],
      (err) => {
        if (err) {
          console.error('Error inserting into ups2:', err);
        } else {
          console.log('Data inserted into ups2');
        }
      }
    );
  }
}

// Save data for ups3 (https://192.168.10.53/data)
async function saveUps3() {
  const data = await fetchData('https://192.168.10.53/data');
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sql = `INSERT INTO ups3 (datetime, pA_value, vA_value, iA_value, fA_value, pB_value, vB_value, iB_value, fB_value) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(
      sql,
      [datetime, data.pA, data.vA, data.iA, data.fA, data.pB, data.vB, data.iB, data.fB],
      (err) => {
        if (err) {
          console.error('Error inserting into ups3:', err);
        } else {
          console.log('Data inserted into ups3');
        }
      }
    );
  }
}

// Save data for ups5 (https://192.168.10.92/data)
async function saveUps5() {
  const data = await fetchData('https://192.168.10.92/data');
  if (data) {
    const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sql = `INSERT INTO ups5 (datetime, pA_value, vA_value, iA_value, fA_value, pB_value, vB_value, iB_value, fB_value) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(
      sql,
      [datetime, data.pA, data.vA, data.iA, data.fA, data.pB, data.vB, data.iB, data.fB],
      (err) => {
        if (err) {
          console.error('Error inserting into ups5:', err);
        } else {
          console.log('Data inserted into ups5');
        }
      }
    );
  }
}

// Save all data and metrics simultaneously
async function saveAllData() {
  await saveLvmdp();
  await savePanel205();
  await savePanel236();
  await savePanel310();
  await savePanel305();
  await savePanel429();
  await saveUps2();
  await saveUps3();
  await saveUps5();
  await saveMetrics();  // Save pue, loadIt, loadFacility
}

// Run the saveAllData function every 5 minutes
setInterval(saveAllData, 300000);

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});
