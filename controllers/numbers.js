var Numbers = require('../models/numbers');

exports.all = function (req, res) {
    Numbers.all(function (err, docs) {
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}

exports.findById = function(req, res){
    Numbers.findById(req.params.id, function (err, doc){
        if(err)
        {
            console.log(err);
            return res.sendStatus(500);
        }        
        return res.send(doc);
    })
}

exports.create = function (req, res) {
    var number = {
        name: req.body.name,
        picture: req.body.picture
    };

    Numbers.create(number, function (err, result) {
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(number);
    })
}

// exports.update = function (req, res) {
//     Numbers.update(req.params.id, {$set: {name: req.body.name }}, function (err, result) {
//         if(err){
//             console.log(err);
//             return res.sendStatus(500);
//         }
//         res.sendStatus(200); 
//     })
// }

exports.delete = function (req, res) {
    Numbers.delete(req.params.id, function (err, result) {
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    })
}
   