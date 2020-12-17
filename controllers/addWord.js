const axios = require("axios");
const app_id = ""; // insert your APP Id
const app_key = ""; // insert your APP Key
const Word = require("../models/word");

// Connection instance for oxford dictionary
const instance = axios.create({
  baseURL: "https://od-api.oxforddictionaries.com",
  headers: {
    Accept: "application/json",
    app_id: app_id,
    app_key: app_key,
  },
});

// /add route
exports.addWord = (req, res, next) => {
  const fetchedword = req.body.name;
  try {
    instance
      .get(`/api/v2/entries/en-gb/${fetchedword}`)
      .then((result) => {
        const word = new Word({
          id: fetchedword,
          definition:
            result.data.results[0].lexicalEntries[0].entries[0].senses[0]
              .definitions[0],
          phrases: result.data.results[0].lexicalEntries[0].phrases[0].text,
        });
        console.log(word);
        word
          .save()
          .then((result) => {
            console.log("Word created successfully in database.");
            res.json({ data: result });
          })
          .catch((err) => {
            console.log("Word creation failed.");
          });
      })
      .catch((err) => res.send(err));
  } catch (err) {
    console.log(err);
  }
};
