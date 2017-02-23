// Require mongoose
var mongoose = require("mongoose");

// Setting up the Schema
var Schema = mongoose.Schema;
var CommentSchema = new Schema({
    title: String,
    body: String
});

// Compiling CommentSchema into a Comment Model
var Comment = mongoose.model("Comment", CommentSchema);

// Exporting the Comment model
module.exports = Comment;