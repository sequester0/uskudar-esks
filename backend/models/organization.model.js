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
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});

organizationSchema.findById = function (cb) {
    return this.model('Organization').find({id: this.id}, cb);
};

organizationSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Organization = mongoose.model('Organization', organizationSchema);

exports.findById = (id) => {
    return Organization.findById(id)
        .populate('category')
        .populate({
            path: 'owner',
            select: '-password'
        })
        .then((result) => {
            result = result.toJSON();
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
            .select('-__v')
            .populate({
                path: 'category',
                select: '-__v'
            })
            .populate({
                path: 'owner',
                select: '-password -__v'
            })
            .exec(function (err, organizations) {
                if (err) {
                    reject(err);
                } else {
                    resolve(organizations);
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

exports.getOrganizationByCategoryId = (categoryId) => {
    return new Promise((resolve, reject) => {
        Organization.find({category: categoryId})
            .populate({
                path: 'category',
                select: '-__v'
            })
            .populate({
                path: 'owner',
                select: '-password -__v'
            })
            .exec(function (err, organizations) {
                if (err) {
                    reject(err);
                } else {
                    resolve(organizations);
                }
            })
    });
};