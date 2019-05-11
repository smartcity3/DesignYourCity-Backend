var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IdeaSchema = new Schema({
    title: String,
    author: String,
    description: String,
    category: String,
    location: String,
    comments: [{ user_id: String, comment: String }]
});

var Idea = mongoose.model('Idea', IdeaSchema);

module.exports = model