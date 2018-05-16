const mongoose = require("mongoose");
var controller = require('./../controllers/panthers.js');
var Panther = mongoose.model('Panther');
module.exports = function(app){
    app.get('/', controller.index);
    app.get('/panthers/new', controller.new);
    app.get('/panthers/:id', controller.pantherId);
    app.post('/panthers', controller.panthers);
    app.get('/panthers/edit/:id', controller.edit);
    app.post('/panthers/:id', controller.postPanthers);
    app.post('/panthers/destroy/:id', controller.destroy);
}