# Note Taker

![screen shot of desktop](/screenshots/before-delete.jpg)
## Description
This application uses express.js and fs npm to read and write data to a json file which acts as a database. 
![demo](/screenshots/note_taker_demo.gif)

## Table of Contents
* [Description](#Description)
* [Installation](#Installation)
* [Features](#Features)
* [Screenshots](#Screenshots)
* [Questions](#Questions)
## Installation
```
npm install
npm install express
npm install fs
npm install uuid
```
## Features
The application uses express.js and fs npm to read and write data to a json file which acts as a database.  
When the user saves a new note and makes a post request the post is given a unique id using uuid npm. This ensures that no two notes will have the same id even if a note is deleted.  
Saving a note adds that note to a json file storing and deleting a note removes that note object from the json file.


## Screenshots
![screenshot on mobile](/screenshots/mobile.jpg)
![screenshot on tablet](/screenshots/index.jpg)

## Questions
[github](https://github.com/nick75mowbray)
