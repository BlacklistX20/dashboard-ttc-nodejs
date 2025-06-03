require('dotenv').config();
const axios = require("axios");
const mysql = require("mysql2");
const { fetchData, getDate, updateTempData, fetchWithRetry } = require('./func');
const { temp } = require('./dbConn');

async function saveBatt3() {
  try {
    const batt3 = await fetchWithRetry("http://192.168.10.31/data");
    const datetime = getDate();
      const sql = `INSERT INTO battery3 (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, batt3.data.s1, batt3.data.k1, batt3.data.s2, batt3.data.k2, batt3.data.sAvg, batt3.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Baterai Lantai 3 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
  } catch (err) {
    console.error("Battery3 failed:", err.message);
  }
}

async function saveRecti3() {
  try {
    const recti3 = await fetchWithRetry("http://192.168.10.107/data")
    const datetime = getDate();
      const sql = `INSERT INTO recti3 (updated_at, t1, h1, t2, h2, t3, h3, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, recti3.data.s1, recti3.data.k1, recti3.data.s2, recti3.data.k2, recti3.data.s3, recti3.data.k3, recti3.data.sAvg, recti3.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Recti Lantai 3 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
  } catch (err) {
    console.error("Recti3 failed:", err.message);
  }
}

async function saveMkios() {
  try {
    const mkios = await fetchWithRetry("http://192.168.10.34/data")
    const datetime = getDate();
      const sql = `INSERT INTO mkios3 (updated_at, t1, h1, t2, h2, t3, h3, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, mkios.data.s1, mkios.data.k1, mkios.data.s2, mkios.data.k2, mkios.data.s3, mkios.data.k3, mkios.data.sAvg, mkios.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database MKIOS :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
  } catch (err) {
    console.error("MKIOS failed:", err.message);
  }
}

async function saveOcs() {
  try {
    const ocs = await fetchWithRetry("http://192.168.10.35/data")
    const datetime = getDate();
      const sql = `INSERT INTO ocs3 (updated_at, t1, h1, t2, h2, t3, h3, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, ocs.data.s1, ocs.data.k1, ocs.data.s2, ocs.data.k2, ocs.data.s3, ocs.data.k3, ocs.data.sAvg, ocs.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database OCS Lantai 3 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
  } catch (err) {
    console.error("OCS failed:", err.message);
  }
}

async function saveCore() {
  try {
    const core = await fetchWithRetry("http://192.168.10.57/data")
    const datetime = getDate();
      const sql = `INSERT INTO core3 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, core.data.s1, core.data.k1, core.data.s2, core.data.k2, core.data.s3, core.data.k3, core.data.s4, core.data.k4, core.data.sAvg, core.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Core Lantai 3 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
  } catch (err) {
    console.error("Core failed:", err.message);
  }
}

async function saveInvas() {
  try {
    const invas = await fetchWithRetry("http://192.168.10.32/data")
    const datetime = getDate();
      const sql = `INSERT INTO invas3 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t5, h5, t6, h6, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, invas.data.s1, invas.data.k1, invas.data.s2, invas.data.k2, invas.data.s3, invas.data.k3, invas.data.s4, invas.data.k4, invas.data.s5, invas.data.k5, invas.data.s6, invas.data.k6, invas.data.sAvg, invas.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database INVAS Lantai 3 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
  } catch (err) {
    console.error("Core failed:", err.message);
  }
}

async function saveLt3() {
  await saveBatt3();
  await saveRecti3();
  await saveMkios();
  await saveCore();
  await saveOcs();
  await saveInvas();
}

async function updateLt3() {
  await updateTempData("http://192.168.10.31/data", 5);
  await updateTempData("http://192.168.10.107/data", 6);
  await updateTempData("http://192.168.10.32/data", 7);
  await updateTempData("http://192.168.10.57/data", 8);
  await updateTempData("http://192.168.10.34/data", 9);
  await updateTempData("http://192.168.10.35/data", 10);
}

module.exports = { saveLt3, updateLt3 };
