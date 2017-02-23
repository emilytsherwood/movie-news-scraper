// Require mongoose
var mongoose = require("mongoose");

// Setting up the schema
var Schema = mongoose.Schema;
var movieSchema =  new Schema ({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    // Will only save one comment's ObjectId
    // Ref refers to the Comment model
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

// Compiling movieSchema into a Article Model
var Article = mongoose.model('Article', movieSchema);

// Exporting the model
module.exports = Article;