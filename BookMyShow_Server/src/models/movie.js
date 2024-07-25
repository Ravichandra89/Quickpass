const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // duration in minutes
  rating: { type: Number, default: 0 },
  ratedby: { type: Number, default: 0 },
  genre: { type: [String], required: true },
  languages: { type: [String], required: true },
  image_url: { type: String, required: true },
  movie_rated: { type: String, default: 'U' }
}, { timestamps: true });

const Movie = mongoose.model('movies', movieSchema);
module.exports = Movie;