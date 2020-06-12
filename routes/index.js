const express = require("express");

const authRouter = require("./auth");
const projectsRouter = require("./projects");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/projects", projectsRouter);

module.exports = router;
