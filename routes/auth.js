const express = require("express");

const sign = require("./helpers/sign");
const ctrl = require("../controllers/admin");
const createResponse = require("./helpers/createResponse");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const admin = await ctrl.authenticate(req.body);
    if (!admin) {
      return res.status(200).json(
        createResponse({
          error: "Authentication failed"
        })
      );
    }

    const token = sign(admin._id);
    res.status(200).json(
      createResponse({
        data: {
          token,
          ...admin
        }
      })
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
