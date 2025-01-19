const axios = require("axios");
const mysql = require("mysql");
const { fetchData, getDate} = require('./func');
const { fuel } = require('./dbConn');

async function saveDaily() {
  const data = await fetchData("http://192.168.10.11/data");
  if (data instanceof Error) {
    console.error(`Error Tangki Harian : ${data.message}`);
    console.error(`Error Details :`, { errno: err.errno, code: err.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO daily (updated_at, tank1, tank2, status) VALUES (?, ?, ?, ?)`;
    fuel.query(sql, [datetime, data.th1, data.th2, "C"], (err) => {
      if (err) {
        console.error("Error Database Tangki Harian :", err);
      }
    });
  }
}

async function saveMonthly() {
  const data = await fetchData("http://192.168.10.12/data");
  if (data instanceof Error) {
    console.error(`Error Tangki Bulanan : ${data.message}`);
    console.error(`Error Details :`, { errno: err.errno, code: err.code });
  } else {
    const datetime = getDate();
    const sql = `INSERT INTO monthly (updated_at, tank1, tank2, tank3, status) VALUES (?, ?, ?, ?, ?)`;
    fuel.query(sql, [datetime, data.th1, data.th2, data.th3, "C"], (err) => {
      if (err) {
        console.error("Error Database Tangki Bulanan :", err);
      }
    });
  }
}

async function updateDaily() {
  const data = await fetchData("http://192.168.10.11/data");
  if (data instanceof Error) {
    const sql = `UPDATE daily SET status = ? WHERE id = 1`;
    fuel.query(sql, ["D"]);
  } else {
    const datetime = getDate();
    const sql = `UPDATE daily SET updated_at = ?, tank1 = ?, tank2 = ?, status = ? WHERE id = 1`;
    fuel.query(sql, [datetime, data.th1, data.th2, "C"]);
  }
}

async function updateMonthly() {
  const data = await fetchData("http://192.168.10.11/data");
  if (data instanceof Error) {
    const sql = `UPDATE monthly SET status = ? WHERE id = 1`;
    fuel.query(sql, ["D"]);
  } else {
    const datetime = getDate();
    const sql = `UPDATE monthly SET updated_at = ?, tank1 = ?, tank2 = ?, tank3 = ?, status = ? WHERE id = 1`;
    fuel.query(sql, [datetime, data.th1, data.th2, data.th3, "C"]);
  }
}

module.exports = { saveDaily, updateDaily };
