import sqlite3 from "sqlite3";
const dbName = "database.db";

let db = new sqlite3.Database(dbName, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("connected to db");
    db.run(
      `CREATE TABLE IF NOT EXISTS statuses 
        (name STRING PRIMARY KEY, 
        isInit BOOLEAN,
        isOrphan BOOLEAN,
        isFinal BOOLEAN)`,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS transitions
        (name STRING PRIMARY KEY,
        fromStatus STRING,
        toStatus STRING)`,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }
});

export default db;
