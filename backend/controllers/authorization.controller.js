const jwtSecret = require('../common/config/env.config').jwt_secret,
    jwt = require('jsonwebtoken');
const crypto = require('crypto');
const uuid = require('uuid');
const BaseResponse = require('../models/baseresponse.model');

exports.login = (req, res) => {
    try {
        let refreshId = req.body.userId + jwtSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, jwtSecret);
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');
        const response = BaseResponse.success({accessToken: token, refreshToken: refresh_token});
        res.status(201).send(response);
    } catch (err) {
        const response = BaseResponse.error(500, err.message, err);
        res.status(500).send(response);
    }
};

exports.refresh_token = (req, res) => {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, jwtSecret);
        const response = BaseResponse.success({id: token});
        res.status(201).send(response);
    } catch (err) {
        const response = BaseResponse.error(500, err.message, err);
        res.status(500).send(response);
    }
};
