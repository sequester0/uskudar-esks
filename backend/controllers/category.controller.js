const CategoryModel = require('../models/category.model')
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
    CategoryModel.list(limit, page)
        .then((result) => {
            var response = BaseResponse.success(result);
            res.status(200).send(response);
        });
};

exports.insert = (req, res) => {
    CategoryModel.createCategory(req.body)
        .then((result) => {
            var response = BaseResponse.created({id: result._id});
            res.status(201).send(response);
        });
};

exports.getById = (req, res) => {
    CategoryModel.findById(req.params.categoryId)
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
    CategoryModel.patchCategory(req.params.categoryId, req.body)
        .then((result) => {
            var response = BaseResponse.nocontent({id: result._id});
            res.status(204).send(response);
        });
};

exports.removeById = (req, res) => {
    CategoryModel.removeById(req.params.categoryId)
        .then((result)=>{
            var response = BaseResponse.deleted({});
            res.status(204).send(response);
        });
}