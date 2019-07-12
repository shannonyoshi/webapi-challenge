const express = require("express");
const ProjDB = require("./data/helpers/projectModel");
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
router.get("/:id/actions", validateProjId, async (req, res)=> {
    const {id} = req.params
    try{
        const actions = await ProjDB.getProjectActions(id)
        if (actions.length) {
            res.status(200).json(actions)
        } else {
            res.status(404).json({message: "Found no actions for this project"})
        }
    } catch(error) {
        res.status(500).json({message: "Error retrieving project actions"})
    }
})
//tested
router.post("/", validateProj, async (req, res)=> {
    try{
        const project = await ProjDB.insert(req.body);
        res.status(201).json(project)
    } catch(error) {
        res.status(500).json({message: "Error adding project"})
    }
})
//tested
router.put("/:id", validateProj, validateProjId, async (req, res)=> {
    try{
        const project = await ProjDB.update(req.params.id, req.body)
        if (project) {
            res.status(201).json(project)
        }
    } catch(error) {
        res.status(500).json({message: "Error updating project"})
    }
})
//tested
router.delete("/:id", validateProjId, async(req, res)=> {
    const {id} = req.params
    try{
        await ProjDB.remove(id)
        res.status(204).end()
    } catch(error) {
        res.status(500).json({message: "Error deleting project"})
    }
})

async function validateProj(req, res, next) {
    if(!req.body) {
        res.status(400).json({message: "Missing project data"})
    } else if (!req.body.name) {
        res.status(400).json({message: "Missing project name"})
    } else if (!req.body.description) {
        res.status(400).json({message: "Missing project description"})
    } else {
        next();
    }
}

async function validateProjId(req, res, next) {
  const { id } = req.params;
  try {
    const project = await ProjDB.get(id);
    if (project) {
      next();
    } else {
      res.status(404).json({ message: "Invalid project ID" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving project" });
  }
}

module.exports = router;
