const FileModel = require('../models/file.model')

exports.uploadFile = (req, res) => {
  const pdfData = Buffer.from(req.body.pdf, 'base64');
  const userId = req.jwt.userId;

  const data = {
    userId: userId,
    pdfData: pdfData
  }
  
  FileModel.createFile(data).then((result) => {
      res.status(201).send({ id: result._id });
  });
};

exports.getById = (req, res) => {
  FileModel.findById(req.params.fileId)
      .then((file) => {
        if (!file) {
          return res.status(404).send('File not found');
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.status(200).send(file);
      }).catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
};