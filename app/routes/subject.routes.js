const { verifySubject } = require("../middlewares");
const controller = require("../controllers/subject.controller");
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
    "/api/subject/add",
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
      ...verifySubject.createBodyValidators,
      verifySubject.ValidateCreateBody,
      verifySubject.checkDuplicateSubject,
    ],
    controller.create
  );

  app.get("/api/subject", [authJwt.verifyToken], controller.getAll);
};
