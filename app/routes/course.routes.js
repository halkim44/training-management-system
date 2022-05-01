const { verifyCourse } = require("../middlewares");
const controller = require("../controllers/course.controller");
const authJwt = require("../middlewares/auth-jwt");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/course/add",
    [authJwt.verifyToken, authJwt.isAdmin, verifyCourse.checkDuplicateCourse],
    controller.create
  );

  app.get("/api/course", [authJwt.verifyToken], controller.getAll);
};
