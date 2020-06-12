const express = require("express");

const ctrl = require("../controllers/projects");
const { schema } = require("../util/request-validators/project");
const createResponse = require("./helpers/createResponse");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const projects = await ctrl.get();
    res.status(200).json(
      createResponse({
        data: projects
      })
    );
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json(
      createResponse({
        error: "Error validating request body"
      })
    );
  }

  try {
    const project = await ctrl.create(req.body);
    res.status(201).json(
      createResponse({
        data: project
      })
    );
  } catch (error) {
    next(error);
  }
});

router.put("/:projectId", auth, async (req, res, next) => {
  try {
    const project = await ctrl.edit(req.params.projectId, req.body);
    res.status(200).json(
      createResponse({
        data: project
      })
    );
  } catch (error) {
    next(error);
  }
});

router.delete("/:projectId", auth, async (req, res, next) => {
  try {
    await ctrl.remove(req.params.projectId);
    res.status(204).json(
      createResponse({
        data: "Project deleted successfully"
      })
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
