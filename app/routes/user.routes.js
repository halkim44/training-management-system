const { verifySignUp, validator } = require("../middlewares");
const controller = require("../controllers/user.controller");
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
    "/api/user/signup",
    [
      ...verifySignUp.signupValidators,
      validator.errorHandler,
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );
  app.post("/api/user/signin", controller.signin);
  app.put(
    "/api/user/update",
    [authJwt.verifyToken, verifySignUp.checkDuplicateUsernameOrEmail],
    controller.update
  );
};
