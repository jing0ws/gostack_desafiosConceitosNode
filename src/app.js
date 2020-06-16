const express = require("express");
const cors = require("cors");

const controllers = require("./controllers/controllers");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/repositories", controllers.getRepos);

app.post("/repositories", controllers.createRepo);

app.put("/repositories/:id", controllers.editRepo);

app.delete("/repositories/:id", controllers.deleteRepo);

app.post("/repositories/:id/like", controllers.like);

module.exports = app;
