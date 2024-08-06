const express = require("express");
const router = new express.Router();
const show_controller = require("../controllers/show");

router.get("/:id",show_controller.getShowByMovieId);
router.get("/seat-info/:id",show_controller.getShowById);

module.exports = router;