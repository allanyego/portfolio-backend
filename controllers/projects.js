const Project = require("../models/project");

async function create(projectData) {
  const project = new Project(projectData);
  return await project.save();
}

async function get() {
  return await Project.find();
}

async function edit(_id, { title, description, url, skills }) {
  const project = await Project.findById({ _id });
  project.title = title || project.title;
  project.url = url || project.url;
  project.description = description || project.description;
  project.skills = skills || project.skills;
  return await project.save();
}

async function remove(_id) {
  return await Project.deleteOne({ _id });
}

module.exports = {
  create,
  get,
  edit,
  remove
};
