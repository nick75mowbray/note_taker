const express = require("express");
const path = require("path");
const fs = require("fs");

// for generating unique id
const { v4: uuidv4 } = require('uuid');

const app = express();
let PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// load stylesheet
app.use('/assets/css',express.static(path.join(__dirname, 'public/assets/css')));
// load javascript
app.use('/assets/js',express.static(path.join(__dirname, 'public/assets/js')));


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

app.post("/notes", function(req, res){
    let newNote = req.body;
    // add id property
    newNote.id = uuidv4();
    
    console.log(newNote);
    // add new note to json file
    let notesRead2 = fs.readFileSync(path.join(__dirname, "/db/db.json"), {encoding: "utf-8"});
    console.log(notesRead2);
    console.log(JSON.parse(notesRead2));
    let notes = [];
    notes.push(JSON.parse(notesRead2));
    notes.push(newNote);
    console.log("notes "+notes);
    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(notes), "utf-8", function(err){
      if (err){
        console.log(err)
      } else {
        console.log(`added ${newNote} to db.json`);
      }
    });
    res.end();
});  




app.get("/api/notes", function(req, res) {
    
    const notesRead = fs.readFileSync(path.join(__dirname, "/db/db.json"), {encoding: "utf-8"});
    console.log(JSON.parse(notesRead));
    res.json(JSON.parse(notesRead));
  });

// function to read json file
// function readJson(res){
    
   
// }

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });