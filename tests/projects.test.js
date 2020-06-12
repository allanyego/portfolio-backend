const request = require("supertest");

const app = require("../app");

jest.useFakeTimers();

let admin = null;

test("POST /auth/login should respond with authenticated admin", async done => {
  try {
    const resp = await request(app)
      .post("/auth/login")
      .send({
        username: "devyego@gmail.com",
        password: process.env.ADMIN_PASS
      });

    expect(resp.body.data.username).toBeDefined();
    admin = resp.body.data;
    done();
  } catch (error) {
    done(error);
  }
});

test("GET /projects should respond with an arraya", async done => {
  try {
    const resp = await request(app).get("/projects");

    expect(resp.statusCode).toBe(200);
    expect(resp.body.data).toBeDefined();
    done();
  } catch (error) {
    done(error);
  }
});

let testProject = {
  title: "smart fundi",
  url: "https://github.com/yegow/sf-server",
  description: "the backend to the smart fundi app",
  skills: "mongodb, mongoose, express, jwt"
};

test("POST /projects should respond with created project", async done => {
  try {
    const resp = await request(app)
      .post("/projects")
      .send(testProject)
      .set("Authorization", `Bearer ${admin.token}`);

    expect(resp.statusCode).toBe(201);
    expect(resp.body.data.title).toBe(testProject.title);
    testProject = resp.body.data;
    done();
  } catch (error) {
    done(error);
  }
});

test("PUT /projects/:projectId should respond with edited project", async done => {
  try {
    const newTitle = "e-booking";
    const resp = await request(app)
      .put(`/projects/${testProject._id}`)
      .send({ title: newTitle })
      .set("Authorization", `Bearer ${admin.token}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.data.title).toBe(newTitle);
    testProject = resp.body.data;
    done();
  } catch (error) {
    done(error);
  }
});

test("DELETE /projects/:projectId should respond with 204", async done => {
  try {
    const resp = await request(app)
      .delete(`/projects/${testProject._id}`)
      .set("Authorization", `Bearer ${admin.token}`);

    expect(resp.statusCode).toBe(204);
    done();
  } catch (error) {
    done(error);
  }
});
