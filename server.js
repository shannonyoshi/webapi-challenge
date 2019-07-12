const express = require("express");
const helmet = require("helmet");

const projRouter = require("./projRouter");
const actionRouter = require("./actionRouter");

const server = express();
server.use(helmet());
server.use(express.json());
server.use("/projects", projRouter);
server.use("/actions", actionRouter);

server.get("/", logger, (req, res) => {
  res.send(`<h2>SPRINT CHALLENGE</h2><h3>nbd</h3>`);
});

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.path}`);
  next();
}

module.exports = server;
