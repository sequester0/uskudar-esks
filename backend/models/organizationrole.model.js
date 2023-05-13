const mongoose = require('../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const organizationRoleSchema = new Schema({
  organization: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    name: { type: String, required: true }
  },
  role: { type: String, enum: ['owner', 'admin', 'member'], required: true }
});

module.exports = organizationRoleSchema;