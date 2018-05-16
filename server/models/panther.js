const mongoose = require('mongoose');
module.exports = function (app){
    var PantherSchema = new mongoose.Schema({
        name: {type: String, required: true, minlength: 1},
        level: {type: Number, required: true, minlength: 1},
        weapon: {type: String, required: true, minlength: 1}
    }, {timestamps: true});
    mongoose.model('Panther', PantherSchema);
    var Panther = mongoose.model('Panther');
}