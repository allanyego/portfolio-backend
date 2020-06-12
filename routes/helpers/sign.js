const jwt = require("jsonwebtoken");

function sign(_id) {
  return jwt.sign(
    {
      _id
    },
    process.env.APP_SECRET
  );
}

module.exports = sign;
