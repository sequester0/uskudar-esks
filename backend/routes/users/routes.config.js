const UsersController = require("../../controllers/users.controller");
const PermissionMiddleware = require("../../middleware/auth.permission.middleware");
const ValidationMiddleware = require("../../middleware/auth.validation.middleware");
const config = require("../../common/config/env.config.js");

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
  app.post("/users", [UsersController.insert]);

  app.get("/users", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(PAID),
    UsersController.list,
  ]);

  app.get("/users/:userId", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    UsersController.getById,
  ]);

  app.patch("/users/:userId", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    UsersController.patchById,
  ]);

  app.delete("/users/:userId", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    UsersController.removeById,
  ]);
};
