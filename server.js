// GET '/' Displays all of the mongooses.
// GET '/mongooses/:id' Displays information about one mongoose.
// GET '/mongooses/new' Displays a form for making a new mongoose.
// POST '/mongooses' Should be the action attribute for the form in the above route (GET '/mongooses/new').
// GET '/mongooses/edit/:id' Should show a form to edit an existing mongoose.
// POST '/mongooses/:id' Should be the action attribute for the form in the above route (GET '/mongooses/edit/:id').
// POST '/mongooses/destroy/:id' Should delete the mongoose from the database by ID.
const express = require("express");
const app = express();
var session = require("express-session");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("express-flash");
// modularize connection to db
mongoose.connect("mongodb://localhost/panthos");
// modularized models
require('./server/models/panther.js')(app);

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000}
}))
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, './views')));

app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');
//routes
require('./server/config/routes.js')(app);

app.listen(8000, function(){
    console.log("listening on port 8000");
})

