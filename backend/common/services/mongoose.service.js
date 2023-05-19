const mongoose = require('mongoose');
let count = 0;

const options = {
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.set('strictQuery', true);

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');

  mongoose.connect('mongodb://127.0.0.1:27017/uskudar-esks', options)
    .then(() => {
      console.log('MongoDB is connected');
    })
    .catch((err) => {
      console.log(`MongoDB connection unsuccessful, retry after 5 seconds. error: ${err}`, ++count);
      setTimeout(connectWithRetry, 5000);
    });
    
};

connectWithRetry();

exports.mongoose = mongoose;