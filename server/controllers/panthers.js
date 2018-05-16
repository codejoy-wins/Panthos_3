const mongoose = require('mongoose');
var Panther = mongoose.model('Panther');
module.exports = {
    index: function(req, res){
        Panther.find({}, function(err, panthers) {
            if(err) {
                console.log('we got an error');
            } else {
                res.render('index', {stuff: panthers});
            }
        })
    },
    new: function(req, res){
        res.render('new');
    },
    pantherId: function(req, res){
        Panther.find({_id : req.params.id}, function(err, panther){
            if(err){
                console.log("panther/:id error ", err);
            }
            else{
                res.render('details', {magic: panther});
            }
        })
    },
    panthers: function(req, res){
        console.log(req.body);
        var panther = new Panther({name: req.body.name, level: req.body.level, weapon: req.body.weapon});
        panther.save(function(err) {
            if(err){
                console.log('mistake', err);
                for (var x in err.errors){
                    req.flash('famous', err.errors[x].message);
                }
            res.redirect('/');
            } else {
                console.log('successfully added panther');
                res.redirect('/');
            }
        });
    },
    edit: function(req, res){
        Panther.find({_id : req.params.id}, function(err, panther){
            if(err){
                console.log("panther/:id error ", err);
            }
            else{
                res.render('edit', {magic: panther});
            }
        })
    },
    postPanthers: function(req, res) {
        console.log("POST DATA", req.body);
        //Panther.update
        Panther.findOne({_id:req.params.id}, function(err, panther){
          panther.name = req.body.name;
          panther.level = req.body.level;
          panther.weapon = req.body.weapon;
          console.log(panther.name, " is the new name");
          console.log(panther.level, " is the new level");
          console.log(panther.weapon, " is the new weapon");
          panther.save(function(err) {
            if(err) {
              console.log('something went wrong');
            }
            else { // else console.log that we did well and then redirect to the root route
              console.log('successfully updated a panther!');
              console.log(panther);
              res.redirect('/');
            }
          })
        })
      },
      destroy: function(req, res) {
        console.log('deleting');
        Panther.remove({_id:req.params.id}, function(err, panther){
            if(err){
                console.log('error_z', err);
            }
            else{
                console.log('Panther destroyed', req.params.id);
                res.redirect('/');
            }
        })
    }
}