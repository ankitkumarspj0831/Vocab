const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const feedRoutes = require("./routes/feed");
const addWordRoutes = require("./routes/addWord");

const app = express();

app.use(bodyParser.json());

const whitelist = [
  "http://localhost:3000",
  "http://localhost:8080",
  "https://ankit-vocab.herokuapp.com/",
];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use("/", feedRoutes);
app.use("/add", addWordRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Connection to database using mongoose
mongoose
  .connect(
    "mongodb+srv://@cluster0.cugpg.mongodb.net/vocab?retryWrites=true"// Mongodb credentials
  )
  .then((result) => {
    console.log("Database connected successfully.");
    app.listen(process.env.PORT || 8080);
  })
  .catch((err) => {
    console.log("Error connecting the database.");
    console.log(err);
  });
