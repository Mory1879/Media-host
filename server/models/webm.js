var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the MovieSchema.
var WebmSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  urlToVideo: {
    type: String,
    required: true
  },
  uploader_id: {
    type: String,
    required: true
  }
});

// Export the model.
module.exports = mongoose.model('webm', WebmSchema);
