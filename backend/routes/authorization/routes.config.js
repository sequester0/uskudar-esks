const VerifyUserMiddleware = require("../../middleware/verify.user.middleware");
const AuthorizationController = require("../../controllers/authorization.controller");
const AuthValidationMiddleware = require("../../middleware/auth.validation.middleware");

exports.routesConfig = function (app) {
  app.post("/auth", [
    VerifyUserMiddleware.hasAuthValidFields,
    VerifyUserMiddleware.isPasswordAndUserMatch,
    AuthorizationController.login,
  ]);

  app.post("/auth/refresh", [
    AuthValidationMiddleware.validJWTNeeded,
    AuthValidationMiddleware.verifyRefreshBodyField,
    AuthValidationMiddleware.validRefreshNeeded,
    AuthorizationController.login,
  ]);
};
