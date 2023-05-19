const mongoose = require('../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const organizationRoleSchema = new Schema({
  organization: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    name: { type: String, required: true }
  },
  role: { type: String, enum: ['owner', 'admin', 'member'], required: true },
  approvalStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
});

organizationRoleSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

organizationRoleSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    
    if (ret.organization) {
      ret.organization.id = ret.organization._id;
      delete ret.organization._id;
    }
  }
});

module.exports = organizationRoleSchema;