const UserModel = require('../models/users.model');
const crypto = require('crypto');
const BaseResponse = require('../models/baseresponse.model');

exports.insert = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    UserModel.createUser(req.body)
        .then((result) => {
            var response = BaseResponse.created({id: result._id});
            res.status(201).send(response);
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    UserModel.list(limit, page)
        .then((result) => {
            var response = BaseResponse.success(result);
            res.status(200).send(response);
        })
};

exports.getById = (req, res) => {
    UserModel.findById(req.params.userId)
        .then((result) => {
            var response = BaseResponse.success(result);
            res.status(200).send(response);
        })
        .catch((err) => {
            var response = BaseResponse.error(404, `Not Found: ${err}`, null);
            res.status(404).send(response);
        });
};

exports.patchById = (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    UserModel.patchUser(req.params.userId, req.body)
        .then((result) => {
            var response = BaseResponse.nocontent({});
            res.status(204).send(response);
        })
        .catch((err) => {
            var response = BaseResponse.error(404, `Not Found: ${err}`, null);
            res.status(404).send(response);
        });
};

exports.removeById = (req, res) => {
    UserModel.removeById(req.params.userId)
        .then((result)=>{
            var response = BaseResponse.nocontent({});
            res.status(204).send(response);
        })
        .catch((err) => {
            var response = BaseResponse.error(404, `Not Found: ${err}`, null);
            res.status(404).send(response);
        });
};

exports.addOrganizationToUser = (req, res) => {
    UserModel.addOrganizationToUser(req.params.userId, req.params.organizationId)
        .then((result) => {
            var response = BaseResponse.nocontent({});
            res.status(204).send(response);
        })
        .catch((err) => {
            var response = BaseResponse.error(404, `Not Found: ${err}`, null);
            res.status(404).send(response);
        });
}

// exports.addOrganizationRole = (userId, organizationId, organizationName, role) => {
//     return User.findById(userId).then((user) => {
//       if (user) {
//         return user.addOrganizationRole(organizationId, organizationName, role);
//       } else {
//         throw new Error('User not found');
//       }
//     });
// };

exports.addOrganizationRole = (req, res) => {
    // Extract the necessary information from the request body
    const { userId, organizationId, organizationName, role } = req.body;
  
    // Find the user by their ID
    User.findById(userId)
      .then(user => {
        // Call the addOrganizationRole method on the user instance
        return user.addOrganizationRole(organizationId, organizationName, role);
      })
      .then(() => {
        // If the operation was successful, send a success response
        res.status(200).send({ success: true, message: 'Organization role added successfully.' });
      })
      .catch(error => {
        // If there was an error, send an error response
        res.status(500).send({ success: false, message: error.message });
      });
};

exports.getOrganizationRole = (userId, organizationId) => {
    return User.findById(userId).then((user) => {
      if (user) {
        return user.getOrganizationRole(organizationId);
      } else {
        throw new Error('User not found');
      }
    });
};