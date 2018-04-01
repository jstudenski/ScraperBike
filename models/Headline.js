var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var HeadlineSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    trim: true,
    unique: true,
    required: "Title is Required"
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
  excerpt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
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

// Export the Article model
module.exports = Headline;