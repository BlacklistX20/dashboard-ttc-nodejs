const axios = require("axios");
const mysql = require("mysql");
const {fetchData, getDate, updateTempData } = require('./func');
const { temp } = require('./dbConn');

async function saveBatt2() {
  const data = await fetchData("http://192.168.10.20/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO battery2 (updated_at, t1, h1, t2, h2, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Baterai Lantai 2 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
      clearInterval(checkStatus);
    }
  }, 1000);
  if (data.status == 200) {
    console.log("Data Battery 2 Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang Baterai Lantai 2 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
}

async function saveRecti2() {
  const data = await fetchData("http://192.168.10.21/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO recti2 (updated_at, t1, h1, t2, h2, t3, h3, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.s3, data.data.k3, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Recti Lantai 2 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
      clearInterval(checkStatus);
    }
  }, 1000);
  if (data.status == 200) {
    console.log("Data Recti 2 Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang Recti Lantai 2 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
}

async function saveTrafo() {
  const data = await fetchData("http://192.168.10.16/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO trafo (updated_at, t1, h1, t2, h2, t3, h3, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.s3, data.data.k3, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Trafo :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
      clearInterval(checkStatus);
    }
  }, 1000);
  if (data.status == 200) {
    console.log("Data Trafo Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang Trafo : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
}

async function saveGenset() {
  const data = await fetchData("http://192.168.10.13/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO genset (updated_at, t1, h1, t2, h2, t3, h3, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.s3, data.data.k3, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database Genset :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
      clearInterval(checkStatus);
    }
  }, 1000);
  if (data.status == 200) {
    console.log("Data Genset Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang Genset : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
}

async function saveCsps() {
  const data = await fetchData("http://192.168.10.59/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO csps2 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.s3, data.data.k3, data.data.s4, data.data.k4, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database CSPS Lantai 2 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
        }
      });
      clearInterval(checkStatus);
    }
  }, 1000);
  if (data.status == 200) {
    console.log("Data CSPS Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang CSPS Lantai 2 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
}

async function saveMsc() {
  const data = await fetchData("http://192.168.10.22/data");
  const checkStatus = setInterval(() => {
    if (data.status == 200) {
      const datetime = getDate();
      const sql = `INSERT INTO msc2 (updated_at, t1, h1, t2, h2, t3, h3, t4, h4, t5, h5, t6, h6, t_avg, h_avg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      temp.query(sql, [datetime, data.data.s1, data.data.k1, data.data.s2, data.data.k2, data.data.s3, data.data.k3, data.data.s4, data.data.k4, data.data.s5, data.data.k5, data.data.s6, data.data.k6, data.data.sAvg, data.data.kAvg], (err) => {
        if (err) {
          console.error("Error Database MSC Lantai 2 :", { errno: err.errno, code: err.code, message: err.sqlMessage });
       }
      });
      clearInterval(checkStatus);
    }
  }, 1000);
  if (data.status == 200) {
    console.log("Data MSC Saved");
  } else if (data.status == 429) {
    console.log(data.response.data);
  } else {
    console.error(`Error Ruang MSC Lantai 2 : ${data.message}`);
    console.error(`Error Details:`, { errno: data.errno, code: data.code });
  };
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
