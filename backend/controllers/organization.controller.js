const OrganizationModel = require('../models/organization.model');
const BaseResponse = require('../models/baseresponse.model');
const BaseError = require('../models/baseresponse.model');

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
            var response = new BaseResponse(true, 200, "Request successful", result);
            res.status(200).send(response);
        });
};

exports.insert = (req, res) => {
    OrganizationModel.createOrganization(req.body)
        .then((result) => {
            var response = new BaseResponse(true, 201, "Request successful", {id: result._id});
            res.status(201).send(response);
        });
}

exports.getById = (req, res) => {
    OrganizationModel.findById(req.params.organizationId)
        .then((result) => {
            var response = new BaseResponse(true, 200, "Request successful", result);
            res.status(200).send(response);
        })
        .catch((err) => {
            var response = new BaseError("Not found", 404, "Request failed");
            res.status(404).send(response);
        });
}

exports.patchById = (req, res) => {
    OrganizationModel.patchOrganization(req.params.organizationId, req.body)
        .then((result) => {
            var response = new BaseResponse(true, 204, "Request successful", {id: result._id});
            res.status(204).send(response);
        });
}   

exports.removeById = (req, res) => {
    OrganizationModel.removeById(req.params.organizationId)
        .then((result)=>{
            var response = new BaseResponse(true, 204, "Request successful", {});
            res.status(204).send(response);
        });
}