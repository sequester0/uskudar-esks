const FileController = require('../../controllers/file.controller');
const PermissionMiddleware = require("../../middleware/auth.permission.middleware");
const ValidationMiddleware = require("../../middleware/auth.validation.middleware");
const config = require("../../common/config/env.config.js");

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post("/files", [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        FileController.uploadFile
    ]);

    app.get("/files/:Id", [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        FileController.getById
    ]);
};