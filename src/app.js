const express = require("express");
const cors = require("cors");

const {
  getAll,
  create,
  updateById,
  deleteById,
  updateRepositoryLikesById,
} = require("./repositories");
const checkUuidIsValid = require("./helpers");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/repositories/:id", checkUuidIsValid);

app
  .get("/repositories", getAll)
  .post("/repositories", create)
  .put("/repositories/:id", updateById)
  .delete("/repositories/:id", deleteById)
  .post("/repositories/:id/like", updateRepositoryLikesById);

module.exports = app;
