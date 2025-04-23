const axios = require("axios");
const mysql = require("mysql");
const { fetchData, getDate, updateTempData, fetchWithRetry } = require('./func');
const { temp } = require('./dbConn');

async function saveBatt4() {
  try {
    const batt4 = await fetchWithRetry("http://192.168.10.40/data")
    const datetime = getDate();
      const sql = `INSERT INTO battery4 (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, batt4.data.s1, batt4.data.k1, batt4.data.s2, batt4.data.k2, batt4.data.sAvg, batt4.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Baterai Lantai 4 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
  } catch (err) {
    console.error("Battery4 failed:", err.message);
  }
}

async function saveRecti4() {
  try {
    const recti4 = await fetchWithRetry("http://192.168.10.41/data")
    const datetime = getDate();
    const sql = `INSERT INTO recti4 (updated_at, t1, h1, t2, h2, t3, h3, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime,recti4.data.s1,recti4.data.k1,recti4.data.s2,recti4.data.k2,recti4.data.s3,recti4.data.k3,recti4.data.sAvg,recti4.data.kAvg], (err) => {
      if (err) {
        console.error("Error Database Recti Lantai 4 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
      }
    });
  } catch (err) {
    console.error("Recti4 failed:", err.message);
  }
}

async function saveBss() {
  try {
    const bss = await fetchWithRetry("http://192.168.10.42/data")
    const datetime = getDate();
    const sql = `INSERT INTO bss4 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, bss.data.s1, bss.data.k1, bss.data.s2, bss.data.k2, bss.data.s3, bss.data.k3, bss.data.s4, bss.data.k4, bss.data.sAvg, bss.data.kAvg], (err) => {
      if (err) {
        console.error("Error Database BSS Lantai 4 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
      }
    }); 
  } catch (err) {
    console.error("BSS failed:", err.message);
  }
}

async function saveInter() {
  try {
    const inter = await fetchWithRetry("http://192.168.10.43/data")
    const datetime = getDate();
      const sql = `INSERT INTO interkoneksi4 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, inter.data.s1, inter.data.k1, inter.data.s2, inter.data.k2, inter.data.s3, inter.data.k3, inter.data.s4, inter.data.k4, inter.data.sAvg, inter.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Interkoneksi Lantai 4 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
  } catch (err) {
    console.error("Interkoneksi failed:", err.message);
  }
}

async function saveTrans() {
  try {
    const trans = await fetchWithRetry("http://192.168.10.77/data")
    const datetime = getDate();
      const sql = `INSERT INTO transmisi4 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t5, h5, t6, h6, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, trans.data.s1, trans.data.k1, trans.data.s2, trans.data.k2, trans.data.s3, trans.data.k3, trans.data.s4, trans.data.k4, trans.data.s5, trans.data.k5, trans.data.s6, trans.data.k6, trans.data.sAvg, trans.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Transmisi Lantai 4 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
  } catch (err) {
    console.error("Transmisi failed:", err.message);
  }
}

async function saveLt4() {
  await saveBatt4();
  await saveRecti4();
  await saveBss();
  await saveInter();
  await saveTrans();
}

async function updateLt4() {
  await updateTempData("http://192.168.10.40/data", 11);
  await updateTempData("http://192.168.10.41/data", 12);
  await updateTempData("http://192.168.10.42/data", 13);
  await updateTempData("http://192.168.10.43/data", 14);
  await updateTempData("http://192.168.10.77/data", 15);
}

module.exports = { saveLt4, updateLt4 };
