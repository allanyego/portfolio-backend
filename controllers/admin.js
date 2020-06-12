const { hash, compare } = require("bcrypt");

const Admin = require("../models/admin");

async function create({ username, password }, cb) {
  const hashed = await hash(password, 10);
  const admin = new Admin({ username, password: hashed });
  return await admin.save(cb);
}

async function authenticate({ username, password }) {
  const admin = await Admin.findOne({ username });
  if (!admin) {
    return null;
  }

  const valid = await compare(password, admin.password);
  if (!valid) {
    return null;
  }

  return {
    _id: admin._id,
    username: admin.username
  };
}

module.exports = {
  create,
  authenticate
};
