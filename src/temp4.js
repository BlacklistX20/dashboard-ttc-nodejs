const axios = require("axios");
const mysql = require("mysql");
const { getDate, updateTempData } = require('./func');
const { temp } = require('./dbConn');

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function saveBatt4() {
  const data = await fetchData("http://192.168.10.40/data");
  if (data instanceof Error) {
    console.error(`Error Ruang Baterai Lantai 4 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO battery4 (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database Baterai Lantai 4 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
      }
    });
  }
}

async function saveRecti4() {
  const data = await fetchData("http://192.168.10.41/data");
  if (data instanceof Error) {
    console.error(`Error Ruang Recti Lantai 4 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO recti4 (updated_at, t1, h1, t2, h2, t3, h3, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.s3, data.k3, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database Recti Lantai 4 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
      }
    });
  }
}

async function saveBss() {
  const data = await fetchData("http://192.168.10.42/data");
  if (data instanceof Error) {
    console.error(`Error Ruang BSS Lantai 4 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO bss4 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.s3, data.k3, data.s4, data.k4, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database BSS Lantai 4 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
      }
    });
  }
}

async function saveInter() {
  const data = await fetchData("http://192.168.10.43/data");
  if (data instanceof Error) {
    console.error(`Error Ruang Interkoneksi Lantai 4 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO interkoneksi4 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.s3, data.k3, data.s4, data.k4, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database Interkoneksi Lantai 4 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
      }
    });
  }
}

async function saveTrans() {
  const data = await fetchData("http://192.168.10.77/data");
  if (data instanceof Error) {
    console.error(`Error Ruang Transmisi Lantai 4 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO transmisi4 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t5, h5, t6, h6, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.s3, data.k3, data.s4, data.k4, data.s5, data.k5, data.s6, data.k6, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database Transmisi Lantai 4 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
      }
    });
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
