const mongoose = require('mongoose');

const neptun="D464BC"

mongoose.connect(`mongodb://localhost/${neptun}`, { useNewUrlParser: true });

module.exports = mongoose;