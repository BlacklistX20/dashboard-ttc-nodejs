const axios = require("axios");
const mysql = require("mysql");
const { fetchData, getDate, updateTempData } = require('./func');
const { temp } = require('./dbConn');

async function saveUtilityA() {
  const data = await fetchData("http://192.168.10.51/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
        const datetime = getDate();
        const sql = `INSERT INTO utility_a5 (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.sAvg, data.data.kAvg], (err) => {
          if (err) {
            console.error("Error Database Utility A Lantai 5 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
          }
        });
      clearInterval(checkStatus);
    }
  }, 1000);
  if (data.status == 200) {
    console.log("Data Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang Utility A Lantai 5 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
}

async function saveUtilityB() {
  const data = await fetchData("http://192.168.10.50/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO utility_b5 (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Utility B Lantai 5 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
      clearInterval(checkStatus);
    };
  }, 1000);
  if (data.status == 200) {
    console.log("Data Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang Utility B Lantai 5 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
}

async function saveDataCenter() {
  const data = await fetchData("http://192.168.10.52/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO data_center5 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t5, h5, t6, h6, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.s3, data.data.k3, data.data.s4, data.data.k4, data.data.s5, data.data.k5, data.data.s6, data.data.k6, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Data Center Lantai 5 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
      clearInterval(checkStatus);
    };
  }, 1000);
  if (data.status == 200) {
    console.log("Data Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang Data Center Lantai 5 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
}

async function savePengembangan() {
  const data = await fetchData("http://192.168.10.53/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO pengembangan5 (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Pengembangan Lantai 5 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
      clearInterval(checkStatus);
    };
  }, 1000);
  if (data.status == 200) {
    console.log("Data Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang Pengembangan Lantai 5 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
}

async function saveContainment() {
  const data = await fetchData("http://192.168.10.54/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO containment5 (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Containment Lantai 5 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
      clearInterval(checkStatus);
    };
  }, 1000);
  if (data.status == 200) {
    console.log("Data Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang Containment Lantai 5 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
}

async function saveLt5() {
  await saveUtilityA();
  await saveUtilityB();
  await saveDataCenter();
  await savePengembangan();
  await saveContainment();
}

async function updateLt5() {
  await updateTempData("http://192.168.10.51/data", 16);
  await updateTempData("http://192.168.10.50/data", 17);
  await updateTempData("http://192.168.10.52/data", 18);
  await updateTempData("http://192.168.10.53/data", 19);
  await updateTempData("http://192.168.10.54/data", 20);
}

module.exports = { saveLt5, updateLt5 };
