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
    addNewNote(newNote);
    
    res.end();
});  

function addNewNote(newNote){

fs.readFile(path.join(__dirname, "/db/db.json"), function(err, data){
    var json = JSON.parse(data);
    json.push(newNote);

    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(json), function(err){
      if (err){
        console.error(err);
      }
    });
})
};


app.get("/api/notes", function(req, res) {
    
    const notesRead = fs.readFileSync(path.join(__dirname, "/db/db.json"), {encoding: "utf-8"});
    
    res.json(JSON.parse(notesRead));
  });

app.delete("/api/notes/:id", function(req, res) {
  const noteid = req.params.id;
  deleteNote(noteid);
})

function deleteNote(id){
    fs.readFile(path.join(__dirname, "/db/db.json"), function(err, data){
      var json = JSON.parse(data);
      for (let i = 0; i < json.length; i++){
        if (json[i].id === id){
          json.splice(i, 1);
        }
      };
  
      fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(json), function(err){
        if (err){
          console.error(err);
        }
      });
  })
};
    
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });    



app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });