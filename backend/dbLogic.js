import db from "./database.js";

const createStatus = (name, isInit, callback) => {
  const sql = `INSERT INTO statuses (name, isInit, isOrphan, isFinal) VALUES (?, ?, ?, ?)`;
  db.run(sql, [name, isInit, !isInit, 1], callback);
};

const isEmptyStatusList = (callback) => {
  const sql = "SELECT * FROM statuses";
  db.all(sql, [], callback);
};

const createTransition = (name, from, to, callback) => {
  const sql = `INSERT INTO transitions (name, fromStatus, toStatus) VALUES (?, ?, ?)`;
  db.run(sql, [name, from, to], callback);
};

const getRows = (table, callback) => {
  const sql = `SELECT * FROM ${table};`;
  db.all(sql, [], callback);
};

const deleteItem = (table, name, callback) => {
  const sql = `DELETE FROM ${table} WHERE name=?`;
  db.run(sql, name, callback);
};

// deletes all the transitions related to the deleted status, and chooses a new init status.
const handleDeleteStatus = (status, callback) => {
  const sql1 = `DELETE FROM transitions WHERE fromStatus=? OR toStatus=?`;
  const sql2 = `UPDATE statuses SET isInit=1 WHERE name= (
    SELECT
    CASE 
        WHEN EXISTS (SELECT 1 FROM transitions) THEN (
            SELECT fromStatus
            FROM transitions
            LIMIT 1
        )
        ELSE (
            SELECT name
            FROM statuses
            LIMIT 1
        )
    END);`;
  db.run(sql1, status, (err) => {
    if (err) {
      return callback(err);
    }
    db.run(sql2, [], callback);
  });
};

const deleteAll = (callback) => {
  db.run(`DELETE FROM statuses;`, [], (err) => {
    if (err) {
      return callback(err);
    }
    db.run(`DELETE FROM transitions;`, [], callback);
  });
};

export {
  createStatus,
  createTransition,
  getRows,
  deleteItem,
  deleteAll,
  isEmptyStatusList,
  handleDeleteStatus,
};
