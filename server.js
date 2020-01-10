const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users.js");
const profile = require("./routes/api/profile.js");
const createproduct = require("./routes/api/createProduct.js");
const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Db Config

const db = require("./config/keys.js").mongoURI;

//connect to mongodb

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

// app.get("/", (req, res) => res.send("Hello"));

//Use Routes

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/create", createproduct);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running on port ${port}`));
