const axios = require("axios");
const mysql = require("mysql");
const { fetchData, getDate, updateTempData } = require('./func');
const { temp } = require('./dbConn');

async function saveBatt4() {
  const data = await fetchData("http://192.168.10.40/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO battery4 (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Baterai Lantai 4 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
      clearInterval(checkStatus);
    }
  }, 1000);
  if (data.status == 200) {
    console.log("Data Battery 4 Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang Baterai Lantai 4 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
}

async function saveRecti4() {
  const data = await fetchData("http://192.168.10.41/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO recti4 (updated_at, t1, h1, t2, h2, t3, h3, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.s3, data.data.k3, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Recti Lantai 4 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
      clearInterval(checkStatus);
    }
  }, 1000);
  if (data.status == 200) {
    console.log("Data Recti 4 Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang Recti Lantai 4 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
}

async function saveBss() {
  const data = await fetchData("http://192.168.10.42/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO bss4 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.s3, data.data.k3, data.data.s4, data.data.k4, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database BSS Lantai 4 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
      clearInterval(checkStatus);
    }
  }, 1000);
  if (data.status == 200) {
    console.log("Data BSS Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang BSS Lantai 4 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
}

async function saveInter() {
  const data = await fetchData("http://192.168.10.43/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO interkoneksi4 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.s3, data.data.k3, data.data.s4, data.data.k4, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Interkoneksi Lantai 4 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
      clearInterval(checkStatus);
    }
  }, 1000);
  if (data.status == 200) {
    console.log("Data Interkoneksi Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang Interkoneksi Lantai 4 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
}

async function saveTrans() {
  const data = await fetchData("http://192.168.10.77/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO transmisi4 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t5, h5, t6, h6, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.s3, data.data.k3, data.data.s4, data.data.k4, data.data.s5, data.data.k5, data.data.s6, data.data.k6, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Transmisi Lantai 4 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
      clearInterval(checkStatus);
    }
  }, 1000);
  if (data.status == 200) {
    console.log("Data Transmisi Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang Transmisi Lantai 4 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
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
