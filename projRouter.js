const express = require("express");
const ProjDB = require("./data/helpers/projectModel");
const auth = require("./auth/mw");
const router = express.Router();

//tested
router.get("/", async (req, res) => {
  try {
    const projects = await ProjDB.get();
    if (projects) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({ message: "No projects found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving projects" });
  }
});
//tested
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await ProjDB.get(id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving project" });
  }
});
//tested
router.get("/:id/actions", auth.validateProjId, async (req, res) => {
  const { id } = req.params;
  try {
    const actions = await ProjDB.getProjectActions(id);
    if (actions.length) {
      res.status(200).json(actions);
    } else {
      res.status(404).json({ message: "Found no actions for this project" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving project actions" });
  }
});
//tested
router.post("/", auth.validateProj, async (req, res) => {
  try {
    const project = await ProjDB.insert(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error adding project" });
  }
});
//tested
router.put("/:id", auth.validateProj, auth.validateProjId, async (req, res) => {
  try {
    const project = await ProjDB.update(req.params.id, req.body);
    if (project) {
      res.status(201).json(project);
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating project" });
  }
});
//tested
router.delete("/:id", auth.validateProjId, async (req, res) => {
  const { id } = req.params;
  try {
    await ProjDB.remove(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Error deleting project" });
  }
});

module.exports = router;
