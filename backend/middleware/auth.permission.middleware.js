const ADMIN_PERMISSION = require("../common/config/env.config")[
  "permissionLevels"
]["ADMIN"];

exports.minimumPermissionLevelRequired = (required_permission_level) => {
  return (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.permissionLevel);
    let userId = req.jwt.userId;
    if (user_permission_level && required_permission_level) {
      return next();
    } else {
      console.log(
        "User ID: " +
          userId +
          " Permission Level: " +
          user_permission_level +
          " Required Permission Level: " +
          required_permission_level
      );
      return res.status(403).send();
    }
  };
};

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
  let user_permission_level = parseInt(req.jwt.permissionLevel);
  let userId = req.jwt.userId;
  if (req.params && req.params.userId && userId === req.params.userId) {
    return next();
  } else {
    if (user_permission_level & ADMIN_PERMISSION) {
      return next();
    } else {
      return res.status(403).send();
    }
  }
};

exports.sameUserCantDoThisAction = (req, res, next) => {
  let userId = req.jwt.userId;
  if (req.params.userId !== userId) {
    return next();
  } else {
    return res.status(400).send();
  }
};
