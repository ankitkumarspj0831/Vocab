const Word = require("../models/word");

exports.getWords = (req, res, next) => {
  Word.find()
    .then((words) => {
      res.json({ message: "Fetched Words Successfully.", words: words });
    })
    .catch((err) => {
      console.log(err);
    });
};
