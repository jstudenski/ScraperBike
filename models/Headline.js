const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HeadlineSchema = new Schema({
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
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

const Headline = mongoose.model("Headline", HeadlineSchema);

module.exports = Headline;