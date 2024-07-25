const express = require("express");
const router = new express.Router();
const movie_controller = require("../controllers/movie");

router.get("/",movie_controller.getAllMovies);


module.exports = router;