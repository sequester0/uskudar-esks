const OrganizationController = require("../../controllers/organization.controller");
const PermissionMiddleware = require("../../middleware/auth.permission.middleware");
const ValidationMiddleware = require("../../middleware/auth.validation.middleware");
const config = require("../../common/config/env.config.js");

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post("/organizations", [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        OrganizationController.insert,
    ]);
    app.get("/organizations", [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        OrganizationController.list,
    ]);
    app.get("/organizations/:organizationId", [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        OrganizationController.getById,
    ]);
    app.patch("/organizations/:organizationId", [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        OrganizationController.patchById,
    ]);
    app.delete("/organizations/:organizationId", [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        OrganizationController.removeById,
    ]);
}