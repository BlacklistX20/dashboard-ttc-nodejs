const axios = require("axios");
const mysql = require("mysql");
const { fetchData, getDate, updateTempData } = require('./func');
const { temp } = require('./dbConn');

async function saveBatt3() {
  const data = await fetchData("http://192.168.10.31/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO battery3 (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Baterai Lantai 3 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
      clearInterval(checkStatus);
    }
  }, 1000);
  if (data.status == 200) {
    console.log("Data Battery 3 Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang Baterai Lantai 3 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
}

async function saveRecti3() {
  const data = await fetchData("http://192.168.10.107/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO recti3 (updated_at, t1, h1, t2, h2, t3, h3, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.s3, data.data.k3, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Recti Lantai 3 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
      clearInterval(checkStatus);
    }
  }, 1000);
  if (data.status == 200) {
    console.log("Data Recti 3 Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang Recti Lantai 3 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
}

async function saveMkios() {
  const data = await fetchData("http://192.168.10.34/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO mkios3 (updated_at, t1, h1, t2, h2, t3, h3, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.s3, data.data.k3, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database MKIOS :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
      clearInterval(checkStatus);
    }
  }, 1000);
  if (data.status == 200) {
    console.log("Data MKIOS Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang MKIOS Lantai 3 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
}

async function saveOcs() {
  const data = await fetchData("http://192.168.10.35/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO ocs3 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.s3, data.data.k3, data.data.s4, data.data.k4, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database OCS Lantai 3 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
      clearInterval(checkStatus);
    }
  }, 1000);
  if (data.status == 200) {
    console.log("Data OCS Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang OCS Lantai 3 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
}

async function saveCore() {
  const data = await fetchData("http://192.168.10.57/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO core3 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.s3, data.data.k3, data.data.s4, data.data.k4, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Core Lantai 3 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
      clearInterval(checkStatus);
    }
  }, 1000);
  if (data.status == 200) {
    console.log("Data Core Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang Core Lantai 3 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
}

async function saveInvas() {
  const data = await fetchData("http://192.168.10.32/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO invas3 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t5, h5, t6, h6, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.s3, data.data.k3, data.data.s4, data.data.k4, data.data.s5, data.data.k5, data.data.s6, data.data.k6, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database INVAS Lantai 3 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
      clearInterval(checkStatus);
    }
  }, 1000);
  if (data.status == 200) {
    console.log("Data INVAS Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang INVAS Lantai 3 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
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
