const axios = require("axios");
const mysql = require("mysql");
const { fetchData, getDate, updateTempData, fetchWithRetry } = require('./func');
const { temp } = require('./dbConn');

async function saveUtilityA() {
  try {
    const utilitya = await fetchWithRetry("http://192.168.10.51/data")
    const datetime = getDate();
        const sql = `INSERT INTO utility_a5 (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        temp.query(sql, [datetime, utilitya.data.s1, utilitya.data.k1, utilitya.data.s2, utilitya.data.k2, utilitya.data.sAvg, utilitya.data.kAvg], (err) => {
          if (err) {
            console.error("Error Database Utility A Lantai 5 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
          }
        });
  } catch (err) {
    console.error("UtilityA failed:", err.message);
  }
}

async function saveUtilityB() {
  try {
    const utilityb = await fetchWithRetry("http://192.168.10.50/data")
    const datetime = getDate();
      const sql = `INSERT INTO utility_b5 (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, utilityb.data.s1, utilityb.data.k1, utilityb.data.s2, utilityb.data.k2, utilityb.data.sAvg, utilityb.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Utility B Lantai 5 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
  } catch (err) {
    console.error("UtilityB failed:", err.message);
  }
}

async function saveDataCenter() {
  try {
    const dc = await fetchWithRetry("http://192.168.10.52/data")
    const datetime = getDate();
      const sql = `INSERT INTO data_center5 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t5, h5, t6, h6, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, dc.data.s1, dc.data.k1, dc.data.s2, dc.data.k2, dc.data.s3, dc.data.k3, dc.data.s4, dc.data.k4, dc.data.s5, dc.data.k5, dc.data.s6, dc.data.k6, dc.data.sAvg, dc.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Data Center Lantai 5 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
  } catch (err) {
    console.error("DataCenter failed:", err.message);
  }
}

async function savePengembangan() {
  try {
    const develop = await fetchWithRetry("http://192.168.10.53/data")
    const datetime = getDate();
      const sql = `INSERT INTO pengembangan5 (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, develop.data.s1, develop.data.k1, develop.data.s2, develop.data.k2, develop.data.sAvg, develop.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Pengembangan Lantai 5 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
  } catch (err) {
    console.error("Pengembangan failed:", err.message);
  }
}

async function saveContainment() {
  try {
    const conta = await fetchWithRetry("http://192.168.10.54/data")
    const datetime = getDate();
      const sql = `INSERT INTO containment5 (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, conta.data.s1, conta.data.k1, conta.data.s2, conta.data.k2, conta.data.sAvg, conta.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Containment Lantai 5 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
  } catch (err) {
    console.error("Containment failed:", err.message);
  }
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
