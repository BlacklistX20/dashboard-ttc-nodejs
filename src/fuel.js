const axios = require("axios");
const mysql = require("mysql");
const { fetchData, getDate, fetchWithRetry } = require("./func");
const { fuel } = require("./dbConn");

async function saveDaily() {
  try {
    const daily = await fetchWithRetry("http://192.168.10.15/data");
    const datetime = getDate();
    const sql = `INSERT INTO daily (updated_at, tank1, tank2, status) VALUES (?, ?, ?, ?)`;
    fuel.query(sql, [datetime, daily.data.th1, daily.data.th2, "C"], (err) => {
      if (err) {
        console.error("Error Database Tangki Harian :", err);
      }
    });
  } catch (err) {
    console.error("saveDaily failed:", err.message);
  }
}

async function saveMonthly() {
  try {
    const month = await fetchData("http://192.168.10.14/data");
    const datetime = getDate();
    const sql = `INSERT INTO monthly (updated_at, tank1, tank2, tank3, status) VALUES (?, ?, ?, ?, ?)`;
    fuel.query(sql, [datetime, month.data.tb1, month.data.tb2, month.data.tb3, "C"], (err) => {
      if (err) {
        console.error("Error Database Tangki Bulanan :", err);
      }
    });
  } catch (err) {
    console.error("saveMonthly failed:", err.message);
  }
}

async function updateDaily() {
  const daily = await fetchData("http://192.168.10.15/data");
  // console.log("harian :", data.status);
  if (daily.status == 200) {
    const datetime = getDate();
    const sql = `UPDATE daily SET updated_at = ?, tank1 = ?, tank2 = ?, status = ? WHERE id = 1`;
    fuel.query(sql, [datetime, daily.data.th1, daily.data.th2, "C"], (err) => {
      if (err) {
        console.log("Error saat menyimpan data tangki harian : ", { errno: err.errno, code: err.code, message: err.sqlMessage });
      }
    });
  } else if (daily.status == 429) {
    const sql = `UPDATE daily SET status = ? WHERE id = 1`;
    fuel.query(sql, ["C"]);
  } else {
    const sql = `UPDATE daily SET status = ? WHERE id = 1`;
    fuel.query(sql, ["D"]);
  }
}

async function updateMonthly() {
  const month = await fetchData("http://192.168.10.14/data");
  // console.log("bulanan :", data.status);
  if (month.status == 200) {
    const datetime = getDate();
    const sql = `UPDATE monthly SET updated_at = ?, tank1 = ?, tank2 = ?, tank3 = ?, status = ? WHERE id = 1`;
    fuel.query(sql, [datetime, month.data.tb1, month.data.tb2, month.data.tb3, "C"], (err) => {
      if (err) {
        console.log("Error saat menyimpan data tangki bulanan : ", { errno: err.errno, code: err.code, message: err.sqlMessage });
      }
    });
  } else if (month.status == 429) {
    const sql = `UPDATE monthly SET status = ? WHERE id = 1`;
    fuel.query(sql, ["C"]);
  } else {
    const sql = `UPDATE monthly SET status = ? WHERE id = 1`;
    fuel.query(sql, ["D"]);
  }
}

module.exports = { saveDaily, updateDaily, saveMonthly, updateMonthly };
