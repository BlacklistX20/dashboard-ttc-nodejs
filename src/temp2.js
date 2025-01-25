const axios = require("axios");
const mysql = require("mysql");
const { fetchData, getDate, updateTempData } = require('./func');

async function saveBatt2() {
  const data = await fetchData("http://192.168.10.20/data");
  if (data instanceof Error) {
    console.error(`Error Ruang Baterai Lantai 2 : ${data.message}`);
    console.error(`Error Details:`, { errno: err.errno, code: err.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO battery.2 (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database Baterai Lantai 2 :", err);
      }
    });
  }
}

async function saveRecti2() {
  const data = await fetchData("http://192.168.10.21/data");
  if (data instanceof Error) {
    console.error(`Error Ruang Recti Lantai 2 : ${data.message}`);
    console.error(`Error Details:`, { errno: err.errno, code: err.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO recti.2 (updated_at, t1, h1, t2, h2, t3, h3, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.s3, data.k3, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database Recti Lantai 2 :", err);
      }
    });
  }
}

async function saveTrafo() {
  const data = await fetchData("http://192.168.10.12/data");
  if (data instanceof Error) {
    console.error(`Error Ruang Trafo : ${data.message}`);
    console.error(`Error Details:`, { errno: err.errno, code: err.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO trafo (updated_at, t1, h1, t2, h2, t3, h3, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.s3, data.k3, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database Trafo :", err);
      }
    });
  }
}

async function saveGenset() {
  const data = await fetchData("http://192.168.10.13/data");
  if (data instanceof Error) {
    console.error(`Error Ruang Genset : ${data.message}`);
    console.error(`Error Details:`, { errno: err.errno, code: err.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO genset (updated_at, t1, h1, t2, h2, t3, h3, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.s3, data.k3, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database Genset :", err);
      }
    });
  }
}

async function saveCsps() {
  const data = await fetchData("http://192.168.10.23/data");
  if (data instanceof Error) {
    console.error(`Error Ruang CSPS Lantai 2 : ${data.message}`);
    console.error(`Error Details:`, { errno: err.errno, code: err.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO csps.2 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.s3, data.k3, data.s4, data.k4, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database CSPS Lantai 2 :", err);
      }
    });
  }
}

async function saveMsc() {
  const data = await fetchData("http://192.168.10.22/data");
  if (data instanceof Error) {
    console.error(`Error Ruang MSC Lantai 2 : ${data.message}`);
    console.error(`Error Details:`, { errno: err.errno, code: err.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO msc.2 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t5, h5, t6, h6, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.s3, data.k3, data.s4, data.k4, data.s5, data.k5, data.s6, data.k6, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database MSC Lantai 2 :", err);
      }
    });
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
  await updateTempData("http://192.168.10.23/data", 4);
  await updateTempData("http://192.168.10.13/data", 21); // Genset
  await updateTempData("http://192.168.10.12/data", 22); // Trafo
}

module.exports = { saveLt2, updateLt2 };
