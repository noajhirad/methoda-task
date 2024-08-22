import express from "express";
import cors from "cors";
import {
  createStatus,
  createTransition,
  getRows,
  deleteItem,
  deleteAll,
  isEmptyStatusList,
  handleDeleteStatus,
} from "./dbLogic.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = 5001;

app.get("/status-list", (req, res) => {
  getRows("statuses", (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).json(rows);
    }
  });
});

app.get("/transition-list", (req, res) => {
  getRows("transitions", (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).json(rows);
    }
  });
});

app.post("/add-status", (req, res) => {
  const { name } = req.body;

  isEmptyStatusList((err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      let isInit = rows.length > 0 ? 0 : 1;

      if (rows.length > 0) {
        isInit = 0;
      } else {
        isInit = 1;
      }
      createStatus(name, isInit, (err) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          res.status(200).send(`Status ${name} is added.`);
        }
      });
    }
  });
});

app.post("/add-transition", (req, res) => {
  const { name, from, to } = req.body;

  createTransition(name, from, to, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(`Transition ${name} is added.`);
    }
  });
});

app.delete("/delete-status", (req, res) => {
  const { name } = req.body;

  deleteItem("statuses", name, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      handleDeleteStatus(name, (err) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          res.status(200).send(`Status ${name} is deleted.`);
        }
      });
    }
  });
});

app.delete("/delete-transition", (req, res) => {
  const { name } = req.body;

  deleteItem("transitions", name, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(`Transition ${name} is deleted.`);
    }
  });
});

app.delete("/delete-all", (req, res) => {
  deleteAll((err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send("Deleted all.");
    }
  });
});

app.listen(port, () => {
  console.log(`backend app listening on port ${port}`);
});
