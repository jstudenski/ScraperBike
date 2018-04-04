const mongoose = require("mongoose");
// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const HeadlineSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    trim: true,
    unique: true,
    required: "Title is Required"
  },
  excerpt: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    validate: [
      function(input) {
        return input.length >= 10;
      },
      "Url should be longer."
    ]
  },
  articleDate: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  imageURL: {
    type: String
  },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Headline = mongoose.model("Headline", HeadlineSchema);

module.exports = Headline;