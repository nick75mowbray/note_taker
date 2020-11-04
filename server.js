var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// load stylesheet
app.use('/css',express.static(path.join(__dirname, 'public/css')));

let NotesArr = [];

const exampleNote = {
  id: 1,
  title: "title of example note",
  description: "description of example note, blah blah blah"
};




app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });

app.post("/notes", function(req, res){
    let newNote = req.body;
    console.log(newNote);
});  

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });