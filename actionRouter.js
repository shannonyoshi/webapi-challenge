const express = require("express");
const ActionDB = require("./data/helpers/actionModel");
const auth = require("./auth/mw");
const router = express.Router();
//tested
router.get("/", async (req, res) => {
  try {
    const actions = await ActionDB.get();
    if (actions) {
      res.status(200).json(actions);
    } else {
      res.status(404).json({ message: "No actions found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving actions" });
  }
});
//tested
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const actions = await ActionDB.get(id);
    if (actions) {
      res.status(200).json(actions);
    } else {
      res.status(404).json({ message: "Actions not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving actions" });
  }
});

router.post("/", auth.validateAction, async (req, res) => {
  try {
    const action = await ActionDB.insert(req.body);
    res.status(201).json(action);
  } catch (error) {
      console.log(error)
    res.status(500).json({ message: "Error adding action" });
  }
});
//tested
router.put("/:id", auth.validateAction, auth.validateProjId, async (req, res) => {
  try {
    const action = await ActionDB.update(req.params.id, req.body);
    res.status(201).json(action);
  } catch (error) {
    res.status(500).json({ message: "Error updating action" });
  }
});
//tested
router.delete("/:id", auth.validateProjId, async (req, res)=> {
    const {id} = req.params
    try {
        await ActionDB.remove(id)
        res.status(204).end();
    } catch(error) {
        res.status(500).json({message: "Error deleting action"})
    }
})

module.exports = router;
