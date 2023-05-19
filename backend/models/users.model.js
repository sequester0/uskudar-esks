const mongoose = require('../common/services/mongoose.service').mongoose;
const OrganizationRole = require('./organizationrole.model');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissionLevel: Number,
    organizations: { type: [OrganizationRole], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialized.
userSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

userSchema.findById = function (cb) {
    return this.model('Users').find({id: this.id}, cb);
};

userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

userSchema.methods.addOrganizationRole = function (organizationId, organizationName, role, approvalStatus) {
    const organizationRole = {
        organization: {
            _id: organizationId,
            name: organizationName,
        },
        role: role,
        approvalStatus: approvalStatus
    };
    this.organizations.push(organizationRole);
    return this.save();
};

userSchema.methods.updateOrganizationApprovalStatus = function (organizationId, status) {
    const orgRoleIndex = this.organizations.findIndex(
        orgRole => orgRole.organization._id.toString() === organizationId.toString()
    );
    
    if (orgRoleIndex > -1) {
        this.organizations[orgRoleIndex].approvalStatus = status;
        return this.save();
    } else {
        return Promise.reject(new Error('Organization not found'));
    }
};

const User = mongoose.model('Users', userSchema);

exports.findByEmail = (email) => {
    return User.find({email: email});
};

exports.findById = (id) => {
    return User.findById(id)
        .populate('organizations')
        .then((result) => {
            result = result.toJSON();
            delete result.__v;
            return result;
        });
};

exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .populate('organizations')
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.patchUser = (id, userData) => {
    return User.findOneAndUpdate({
        _id: id
    }, userData);
};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteMany({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

exports.addOrganizationToUser = (userId, organizationId) => {
    return User.findOneAndUpdate({
        _id: userId
    }, {
        $push: {
            organizations: organizationId
        }
    });
};

exports.User = User;

// exports.addOrganizationRole = function (organizationId, organizationName, role) {
//     const organizationRole = {
//       organization: {
//         _id: organizationId,
//         name: organizationName,
//       },
//       role: role,
//     };
    
//     this.organizations.push(organizationRole);
//     return this.save();
// };