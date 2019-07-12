// const express = require("express")
const ProjDB = require("../data/helpers/projectModel");
module.exports = {
  validateProj,
  validateProjId,
  validateAction
};

async function validateProj(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "Missing project data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "Missing project name" });
  } else if (!req.body.description) {
    res.status(400).json({ message: "Missing project description" });
  } else {
    next();
  }
}

async function validateProjId(req, res, next) {
   const id = req.body.project_id || req.params.id;
  try {
    const project = await ProjDB.get(id);
    if (project) {
      next();
    } else {
      res.status(404).json({ message: "Invalid project ID" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving project" });
  }
}

async function validateAction(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "Missing action data" });
  } else if (!req.body.project_id) {
      res.status(400).json({message: "Missing project data"})
  } else if (!req.body.description) {
      res.status(400).json({message: "Missing description"})
  } else {
    next();
  }
}
