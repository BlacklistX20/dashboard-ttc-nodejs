const axios = require("axios");
const mysql = require("mysql");
const { fetchData, getDate } = require("./func");
const { fuel } = require("./dbConn");

async function saveDaily() {
  const daily = await fetchData("http://192.168.10.15/data");
  if (daily.status == 200) {
    const datetime = getDate();
    const sql = `INSERT INTO daily (updated_at, tank1, tank2, status) VALUES (?, ?, ?, ?)`;
    fuel.query(sql, [datetime, daily.data.th1, daily.data.th2, "C"], (err) => {
      if (err) {
        console.error("Error Database Tangki Harian :", err);
      }
    });
  } else if (daily.status == 429) {
    setInterval(() => {
      const datetime = getDate();
      const sql = `INSERT INTO daily (updated_at, tank1, tank2, status) VALUES (?, ?, ?, ?)`;
      fuel.query(sql, [datetime, daily.data.th1, daily.data.th2, "C"], (err) => {
        if (err) {
          console.error("Error Database Tangki Harian :", err);
        }
      });
    }, 60000);
  } else {
    console.error(`Error Tangki Harian : ${data.message}`);
    console.error(`Error Details :`, { errno: err.errno, code: err.code });
  }
}

async function saveMonthly() {
  const month = await fetchData("http://192.168.10.14/data");
  if (month.status == 200) {
    const datetime = getDate();
    const sql = `INSERT INTO monthly (updated_at, tank1, tank2, tank3, status) VALUES (?, ?, ?, ?, ?)`;
    fuel.query(
      sql,
      [datetime, month.data.tb1, month.data.tb2, month.data.tb3, "C"],
      (err) => {
        if (err) {
          console.error("Error Database Tangki Bulanan :", err);
        }
      }
    );
  } else if (month.status == 429) {
    setInterval(() => {
      const datetime = getDate();
      const sql = `INSERT INTO monthly (updated_at, tank1, tank2, tank3, status) VALUES (?, ?, ?, ?, ?)`;
      fuel.query(
        sql,
        [datetime, month.data.tb1, month.data.tb2, month.data.tb3, "C"],
        (err) => {
          if (err) {
            console.error("Error Database Tangki Bulanan :", err);
          }
        }
      );
    }, 60000);
  } else {
    console.error(`Error Tangki Bulanan : ${data.message}`);
    console.error(`Error Details :`, { errno: err.errno, code: err.code });
  }
}

async function updateDaily() {
  const daily = await fetchData("http://192.168.10.15/data");
  // console.log("harian :", data.status);
  if (daily.status == 200) {
    const datetime = getDate();
    const sql = `UPDATE daily SET updated_at = ?, tank1 = ?, tank2 = ?, status = ? WHERE id = 1`;
    fuel.query(sql, [datetime, daily.data.th1, daily.data.th2, "C"]);
  } else if (daily.status == 429) {
    const sql = `UPDATE daily SET status = ? WHERE id = 1`;
    fuel.query(sql, ["D"]);
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
    fuel.query(sql, [datetime, month.data.tb1, month.data.tb2, month.data.tb3, "C"]);
  } else if (month.status == 429) {
    const sql = `UPDATE monthly SET status = ? WHERE id = 1`;
    fuel.query(sql, ["C"]);
  } else {
    const sql = `UPDATE monthly SET status = ? WHERE id = 1`;
    fuel.query(sql, ["D"]);
  }
}

module.exports = { saveDaily, updateDaily, saveMonthly, updateMonthly };
