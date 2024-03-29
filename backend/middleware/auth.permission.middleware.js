const ADMIN_PERMISSION = require("../common/config/env.config")[
  "permissionLevels"
]["ADMIN"];
const BaseError = require("../models/baseresponse.model");

exports.minimumPermissionLevelRequired = (required_permission_level) => {
  return (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.permissionLevel);
    if (user_permission_level >= required_permission_level) {
      return next();
    } else {
      var response = new BaseError("Permission denied", 403, "You don't have permission to access this resource.");
      return res.status(403).send(response);
    }
  };
};

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
  const user_permission_level = parseInt(req.jwt.permissionLevel);
  const userId = req.jwt.userId;
  if (req.params && req.params.userId && userId === req.params.userId) {
    return next();
  } else {
    if (user_permission_level >= ADMIN_PERMISSION) {
      return next();
    } else {
      var response = new BaseError("Permission denied", 403, "You don't have permission to access this resource.");
      return res.status(403).send(response);
    }
  }
};

exports.sameUserCantDoThisAction = (req, res, next) => {
  let userId = req.jwt.userId;
  if (req.params.userId !== userId) {
    return next();
  } else {
    var response = new BaseError("Invalid Operation", 400, "You can't perform this operation on yourself.");
    return res.status(400).send(response);
  }
};
