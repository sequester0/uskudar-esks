const mongoose = require('../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Define the `id` virtual field
categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialized.
categorySchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});

categorySchema.findById = function (cb) {
    return this.model('Category').find({id: this.id}, cb);
};

categorySchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Category = mongoose.model('Category', categorySchema);

exports.findById = (id) => {
    return Category.findById(id)
      .then((result) => {
        if (!result) {
          throw new Error(`Category not found with ID ${id}`);
        }
        // Convert the result to a JSON object and remove the `__v` field
        result = result.toJSON();
        return result;
      });
};

exports.createCategory = (categoryData) => {
    const category = new Category(categoryData);
    return category.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Category.find()
            .select('-__v')
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.patchCategory = (id, categoryData) => {
    return Category.findOneAndUpdate({
        _id: id
    }, categoryData);
};

exports.removeById = (categoryId) => {
    return new Promise((resolve, reject) => {
        Category.deleteMany({_id: categoryId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};