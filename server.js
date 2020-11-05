const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
let PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// load stylesheet
app.use('/assets/css',express.static(path.join(__dirname, 'public/assets/css')));
// load javascript
app.use('/assets/js',express.static(path.join(__dirname, 'public/assets/js')));

let NotesArr = [];

const exampleNote = {
  id: 1,
  title: "title of example note",
  description: "description of example note, blah blah blah"
};




app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

app.post("/notes", function(req, res){
    let newNote = req.body;
    console.log(newNote);
});  

const jsonData = fs.readFile(path.join(__dirname, "/db/db.json"), function(err, data){
        if (data){
            console.log("data returned"+data);
            return data;
        }
        if (err){
            console.error(err);
        }
    });

app.get("/api/notes", function(req, res) {
    res.json(jsonData);
  });

// function to read json file
// function readJson(res){
    
   
// }

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });