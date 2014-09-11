var express = require("express"),
    mongoose = require("mongoose"),
    app = express();

mongoose.connect("mongodb://localhost/test", function (err) {
  if (!err) {
    console.log("Connected to MongoDB");
  } else {
    console.error(err);
  }
});

app.get("/", function (req, res) {
  res.send("Hey buddy!");
});

var Thing = require("./model");

app.get("/:name", function (req, res) {
  Thing.find({ name: req.params.name }, function (err, t) {
    if (t.length < 1) {
      var thing = new Thing();
      thing.name = req.params.name;
      thing.save(function(err, savedThing) {
        if (err) {
          res.send(500);
        } else {
          res.send([savedThing]);
        }
      });
    } else {
      res.send(t);
    }
  });
});

app.listen(3000);
