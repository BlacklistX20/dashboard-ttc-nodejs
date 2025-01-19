const axios = require("axios");
const mysql = require("mysql");
const { fetchData, getDate, updateTempData } = require('./func');

async function saveBatt3() {
  const data = await fetchData("http://192.168.10.72/data");
  if (data instanceof Error) {
    console.error(`Error Ruang Baterai Lantai 3 : ${data.message}`);
    console.error(`Error Details:`, { errno: err.errno, code: err.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO battery2 (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database Baterai Lantai 3 :", err);
      }
    });
  }
}

async function saveRecti3() {
  const data = await fetchData("http://192.168.10.78/data");
  if (data instanceof Error) {
    console.error(`Error Ruang Recti Lantai 3 : ${data.message}`);
    console.error(`Error Details:`, { errno: err.errno, code: err.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO recti2 (updated_at, t1, h1, t2, h2, t3, h3, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.s3, data.k3, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database Recti Lantai 3 :", err);
      }
    });
  }
}

async function saveMkios() {
  const data = await fetchData("http://192.168.10.73/data");
  if (data instanceof Error) {
    console.error(`Error Ruang MKIOS Lantai 3 : ${data.message}`);
    console.error(`Error Details:`, { errno: err.errno, code: err.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO mkios (updated_at, t1, h1, t2, h2, t3, h3, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.s3, data.k3, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database MKIOS :", err);
      }
    });
  }
}

async function saveOcs() {
  const data = await fetchData("http://192.168.10.76/data");
  if (data instanceof Error) {
    console.error(`Error Ruang OCS Lantai 3 : ${data.message}`);
    console.error(`Error Details:`, { errno: err.errno, code: err.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO ocs (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.s3, data.k3, data.s4, data.k4, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database OCS Lantai 3 :", err);
      }
    });
  }
}

async function saveCore() {
  const data = await fetchData("http://192.168.10.76/data");
  if (data instanceof Error) {
    console.error(`Error Ruang Core Lantai 3 : ${data.message}`);
    console.error(`Error Details:`, { errno: err.errno, code: err.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO core (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.s3, data.k3, data.s4, data.k4, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database Core Lantai 3 :", err);
      }
    });
  }
}

async function saveInvas() {
  const data = await fetchData("http://192.168.10.77/data");
  if (data instanceof Error) {
    console.error(`Error Ruang INVAS Lantai 3 : ${data.message}`);
    console.error(`Error Details:`, { errno: err.errno, code: err.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO invas (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t5, h5, t6, h6, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    temp.query(sql, [datetime, data.s1, data.k1, data.s2, data.k2, data.s3, data.k3, data.s4, data.k4, data.s5, data.k5, data.s6, data.k6, data.sAvg, data.kAvg], (err) => {
      if (err) {
        console.error("Error Database INVAS Lantai 3 :", err);
      }
    });
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
  await updateTempData("http://192.168.10.72/data", 5);
  await updateTempData("http://192.168.10.78/data", 6);
  await updateTempData("http://192.168.10.73/data", 7);
  await updateTempData("http://192.168.10.76/data", 8);
  await updateTempData("http://192.168.10.77/data", 9);
  await updateTempData("http://192.168.10.77/data", 10);
}

module.exports = { saveLt3, updateLt3 };
