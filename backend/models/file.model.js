const mongoose = require('../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const pdfSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pdfData: { type: Buffer, required: true},
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    createdAt: { type: Date, default: Date.now }
});

// Define the `id` virtual field
pdfSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialized.
pdfSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});

pdfSchema.findById = function (cb) {
    return this.model('Pdf').find({id: this.id}, cb);
};

const Pdf = mongoose.model('Pdf', pdfSchema);

exports.createFile = function ({userId, pdfData}) {
    const file = new Pdf({userId, pdfData});
    return file.save();
};

exports.findById = (id) => {
    return Pdf.findById(id).then((result) => {
                if (!result) {
                    throw new Error(`Pdf not found with ID ${id}`);
                }
                return result.pdfData;
            });
};