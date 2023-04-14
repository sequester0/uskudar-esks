const mongoose = require('../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    name: String,
    description: String,
    logo: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

organizationSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialized.
organizationSchema.set('toJSON', {
    virtuals: true
});

organizationSchema.findById = function (cb) {
    return this.model('Organization').find({id: this.id}, cb);
};

const Organization = mongoose.model('Organization', organizationSchema);

exports.findById = (id) => {
    return Organization.findById(id)
        .populate('category')
        .populate('owner')
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createOrganization = (organizationData) => {
    const organization = new Organization(organizationData);
    return organization.save();
}

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Organization.find()
            .limit(perPage)
            .skip(perPage * page)
            .populate('category')
            .populate({
                path: 'owner',
                select: '-password -__v' // Exclude the password field from the owner of the organization
            })
            .lean()
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.patchOrganization = (id, organizationData) => {
    return Organization.findOneAndUpdate({
        _id: id
    }, organizationData);
};

exports.removeById = (organizationId) => {
    return new Promise((resolve, reject) => {
        Organization.deleteMany({_id: organizationId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};