require('dotenv').config();
const axios = require("axios");
const mysql = require("mysql2");
const {fetchData, getDate, updateTempData, fetchWithRetry } = require('./func');
const { temp } = require('./dbConn');

async function saveBatt2() {
  try {
    const batt2 = await fetchWithRetry("http://192.168.10.20/data");
    const datetime = getDate();
    const sql = `INSERT INTO battery2 (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, batt2.data.s1, batt2.data.k1, batt2.data.s2, batt2.data.k2, batt2.data.sAvg, batt2.data.kAvg], (err) => {
      if (err) {
        console.error("Error Database Baterai Lantai 2 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
      }
    });
  } catch (err) {
    console.error("Battery2 failed:", err.message);
  }
}

async function saveRecti2() {
  try {
    const recti2 = await fetchWithRetry("http://192.168.10.21/data")
    const datetime = getDate();
      const sql = `INSERT INTO recti2 (updated_at, t1, h1, t2, h2, t3, h3, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, recti2.data.s1, recti2.data.k1, recti2.data.s2, recti2.data.k2, recti2.data.s3, recti2.data.k3, recti2.data.sAvg, recti2.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Recti Lantai 2 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
  } catch (err) {
    console.error("Recti2 failed:", err.message);
  }
}

async function saveTrafo() {
  try {
    const trafo = await fetchWithRetry("http://192.168.10.16/data")
    const datetime = getDate();
      const sql = `INSERT INTO trafo (updated_at, t1, h1, t2, h2, t3, h3, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, trafo.data.s1, trafo.data.k1, trafo.data.s2, trafo.data.k2, trafo.data.s3, trafo.data.k3, trafo.data.sAvg, trafo.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Trafo :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
  } catch (err) {
    console.error("Trafo failed:", err.message);
  }
}

async function saveGenset() {
  try {
    const genset = await fetchWithRetry("http://192.168.10.13/data")
    const datetime = getDate();
      const sql = `INSERT INTO genset (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, genset.data.s1, genset.data.k1, genset.data.s2, genset.data.k2, genset.data.sAvg, genset.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Genset :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
  } catch (err) {
    console.error("Genset failed:", err.message);
  }
}

async function saveCsps() {
  try {
    const csps = await fetchWithRetry("http://192.168.10.59/data")
    const datetime = getDate();
      const sql = `INSERT INTO csps2 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, csps.data.s1, csps.data.k1, csps.data.s2, csps.data.k2, csps.data.s3, csps.data.k3, csps.data.s4, csps.data.k4, csps.data.sAvg, csps.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database CSPS Lantai 2 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
  } catch (err) {
    console.error("CSPS failed:", err.message);
  }
}

async function saveMsc() {
  try {
    const msc = await fetchWithRetry("http://192.168.10.22/data")
    const datetime = getDate();
      const sql = `INSERT INTO msc2 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t5, h5, t6, h6, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, msc.data.s1, msc.data.k1, msc.data.s2, msc.data.k2, msc.data.s3, msc.data.k3, msc.data.s4, msc.data.k4, msc.data.s5, msc.data.k5, msc.data.s6, msc.data.k6, msc.data.sAvg, msc.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database MSC Lantai 2 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
       }
      });
  } catch (err) {
    console.error("MSC failed:", err.message);
  }
}

async function saveLt2() {
  await saveBatt2();
  await saveRecti2();
  await saveCsps();
  await saveTrafo();
  await saveGenset();
  await saveMsc();
}

async function updateLt2() {
  await updateTempData("http://192.168.10.20/data", 1);
  await updateTempData("http://192.168.10.21/data", 2);
  await updateTempData("http://192.168.10.22/data", 3);
  await updateTempData("http://192.168.10.59/data", 4);
  await updateTempData("http://192.168.10.13/data", 21); // Genset
  await updateTempData("http://192.168.10.16/data", 22); // Trafo
}

module.exports = { saveLt2, updateLt2 };
