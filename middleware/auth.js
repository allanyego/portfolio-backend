const jwt = require("jsonwebtoken");

const createResponse = require("../routes/helpers/createResponse");

const auth = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.APP_SECRET);
      const { _id } = decodedToken;

      res.locals.adminId = _id;
      next();
    } else {
      res.status(400).json(
        createResponse({
          error: "No authorization header"
        })
      );
    }
  } catch (e) {
    res.status(401).json(
      createResponse({
        error: "Invalid token"
      })
    );
  }
};

module.exports = auth;
