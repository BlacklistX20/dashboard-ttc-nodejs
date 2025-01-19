const axios = require("axios");
const mysql = require("mysql");
const { fetchData, getDate, updateTempData } = require('./func');

async function saveUtilityA() {
  const data = await fetchData("http://192.168.10.72/data");
  if (data instanceof Error) {
    console.error(`Error Ruang Utility A Lantai 5 : ${data.message}`);
    console.error(`Error Details:`, { errno: err.errno, code: err.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO utility_a (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database Utility A Lantai 5 :", err);
      }
    });
  }
}

async function saveUtilityB() {
  const data = await fetchData("http://192.168.10.72/data");
  if (data instanceof Error) {
    console.error(`Error Ruang Utility B Lantai 5 : ${data.message}`);
    console.error(`Error Details:`, { errno: err.errno, code: err.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO utility_b (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database Utility B Lantai 5 :", err);
      }
    });
  }
}

async function saveDataCenter() {
  const data = await fetchData("http://192.168.10.77/data");
  if (data instanceof Error) {
    console.error(`Error Ruang Data Center Lantai 5 : ${data.message}`);
    console.error(`Error Details:`, { errno: err.errno, code: err.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO dc (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t5, h5, t6, h6, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.s3, data.k3, data.s4, data.k4, data.s5, data.k5, data.s6, data.k6, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database Data Center Lantai 5 :", err);
      }
    });
  }
}

async function savePengembangan() {
  const data = await fetchData("http://192.168.10.72/data");
  if (data instanceof Error) {
    console.error(`Error Ruang Pengembangan Lantai 5 : ${data.message}`);
    console.error(`Error Details:`, { errno: err.errno, code: err.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO pengembangan (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database Pengembangan Lantai 5 :", err);
      }
    });
  }
}

async function saveContainment() {
  const data = await fetchData("http://192.168.10.72/data");
  if (data instanceof Error) {
    console.error(`Error Ruang Containment Lantai 5 : ${data.message}`);
    console.error(`Error Details:`, { errno: err.errno, code: err.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO containment (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database Containment Lantai 5 :", err);
      }
    });
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
  await updateTempData("http://192.168.10.72/data", 16);
  await updateTempData("http://192.168.10.78/data", 17);
  await updateTempData("http://192.168.10.73/data", 18);
  await updateTempData("http://192.168.10.76/data", 19);
  await updateTempData("http://192.168.10.77/data", 20);
}

module.exports = { saveLt5, updateLt5 };
