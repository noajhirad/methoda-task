import db from "./database.js";

const createStatus = (name, isInit, callback) => {
  const sql = `INSERT INTO statuses (name, isInit) VALUES (?,?)`;
  db.run(sql, [name, isInit], callback);
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
  const sql = `DELETE FROM transitions WHERE fromStatus=? OR toStatus=?`;
  db.run(sql, [status, status], callback);
};

const deleteAll = (callback) => {
  db.run(`DELETE FROM statuses;`, [], (err) => {
    if (err) {
      return callback(err);
    }
    db.run(`DELETE FROM transitions;`, [], callback);
  });
};

const updateInitStatus = (name, callback) => {
  db.run(`UPDATE statuses SET isInit = ? WHERE name = ?;`, [1, name], callback);
};

export {
  createStatus,
  createTransition,
  getRows,
  deleteItem,
  deleteAll,
  handleDeleteStatus,
  updateInitStatus,
};
