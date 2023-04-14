const CategoryController = require("../../controllers/category.controller");
const PermissionMiddleware = require("../../middleware/auth.permission.middleware");
const ValidationMiddleware = require("../../middleware/auth.validation.middleware");
const config = require("../../common/config/env.config.js");

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post("/categories", [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        CategoryController.insert,
    ]);
    app.get("/categories", [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        CategoryController.list,
    ]);
    app.get("/categories/:categoryId", [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        CategoryController.getById,
    ]);
    app.patch("/categories/:categoryId", [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        CategoryController.patchById,
    ]);
    app.delete("/categories/:categoryId", [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        CategoryController.removeById,
    ]);
};