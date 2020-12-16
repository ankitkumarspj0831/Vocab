const express = require("express");
const router = express.Router();

const feedController = require("../controllers/feed");

router.get("/", feedController.getWords);

module.exports = router;
