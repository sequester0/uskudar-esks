const OrganizationModel = require('../models/organization.model');
const UserModel = require('../models/users.model').User;
const BaseResponse = require('../models/baseresponse.model');

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    OrganizationModel.list(limit, page)
        .then((result) => {
            var response = BaseResponse.success(result);
            res.status(200).send(response);
        });
};

exports.insert = (req, res) => {
    OrganizationModel.createOrganization(req.body)
        .then((result) => {
            UserModel.findById(result.owner)
              .then((user) => {
                user.addOrganizationRole(result._id, result.name, 'owner', result.approvalStatus)
                    .then(() => {
                      var response = BaseResponse.created({id: result._id});
                      res.status(201).send(response);
                    })
                    .catch((error) => {
                      var response = BaseResponse.error(500, `Internal Server Error: ${error.message}`, null);
                      res.status(500).send(response);
                    });
              })
              .catch((error) => {
                    var response = BaseResponse.error(500, `Internal Server Error: ${error.message}`, null);
                    res.status(500).send(response);
              });
        });
}

exports.getById = (req, res) => {
    OrganizationModel.findById(req.params.organizationId)
        .then((result) => {
            var response = BaseResponse.success(result);
            res.status(200).send(response);
        })
        .catch((err) => {
            var response = BaseResponse.error(404, `Not Found: ${err}`, null);
            res.status(404).send(response);
        });
}

exports.patchById = (req, res) => {
    OrganizationModel.patchOrganization(req.params.organizationId, req.body)
        .then((result) => {
            var response = BaseResponse.success({id: result._id});
            res.status(204).send(response);
        })
        .catch((err) => {
            var response = BaseResponse.error(404, `Not Found: ${err}`, null);
            res.status(404).send(response);
        });
}   

exports.removeById = (req, res) => {
    OrganizationModel.removeById(req.params.organizationId)
        .then((result)=>{
            var response = BaseResponse.deleted({});
            res.status(204).send(response);
        })
        .catch((err) => {
            var response = BaseResponse.error(404, `Not Found: ${err}`, null);
            res.status(404).send(response);
        });
}

exports.getOrganizationByCategoryId = (req, res) => {
    OrganizationModel.getOrganizationByCategoryId(req.params.categoryId)
        .then((result) => {
            var response = BaseResponse.success(result);
            res.status(200).send(response);
        })
        .catch((err) => {
            var response = BaseResponse.error(404, `Not Found: ${err}`, null);
            res.status(404).send(response);
        });
}

exports.updateApprovalStatus = (req, res) => {
    const organizationId = req.params.organizationId;
    const newStatus = req.body.status; // 'approved' or 'rejected'
    OrganizationModel.findByIdAndUpdate(organizationId, { approvalStatus: newStatus }, { new: true })
        .then((organization) => {
            UserModel.findById(organization.owner)
                .then((user) => {
                    user.updateOrganizationApprovalStatus(organizationId, organization.approvalStatus);
                });
            var response = BaseResponse.success(organization);
            res.status(200).send(response);
        })
        .catch((error) => {
            var response = BaseResponse.error(500, `Internal Server Error: ${error.message}`, null);
            res.status(500).send(response);
        });
};