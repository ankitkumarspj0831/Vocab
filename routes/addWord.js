const express = require("express");
const router = express.Router();

const addWordController = require("../controllers/addWord");

router.post("/", addWordController.addWord);

module.exports = router;
