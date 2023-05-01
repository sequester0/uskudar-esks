const FileModel = require('../models/file.model')
const BaseResponse = require('../models/baseresponse.model');

exports.uploadFile = (req, res) => {
  const pdfData = Buffer.from(req.body.pdf, 'base64');
  const userId = req.jwt.userId;
  const organizationId = req.jwt.organization;

  const data = {
    userId: userId,
    pdfData: pdfData,
    organization: organizationId
  }
  
  FileModel.createFile(data).then((result) => {
    var response = BaseResponse.created({ id: result._id });
      res.status(201).send(response);
  });
};

exports.getById = (req, res) => {
  FileModel.findById(req.params.fileId)
      .then((file) => {
        if (!file) {
          var response = BaseResponse.error(404, `Not Found: ${err}`, null);
          return res.status(404).send(response);
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.status(200).send(file);
      }).catch((err) => {
        console.error(err);
        var response = BaseResponse.error(500, `Internal Server Error: ${err}`, null);
        res.status(500).send(response);
      });
};