const CategoryModel = require('../models/category.model')

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
            res.status(200).send(result);
        });
};

exports.insert = (req, res) => {
    CategoryModel.createCategory(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.getById = (req, res) => {
    CategoryModel.findById(req.params.categoryId)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(404).send({message: 'Not found'});
        });
}

exports.patchById = (req, res) => {
    CategoryModel.patchCategory(req.params.categoryId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};

exports.removeById = (req, res) => {
    CategoryModel.removeById(req.params.categoryId)
        .then((result)=>{
            res.status(204).send({});
        });
}