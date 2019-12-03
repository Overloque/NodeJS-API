var ObjectID = require('mongodb').ObjectID;
var db = require('../db');

exports.all = function (cb) {
    db.get().collection('numbers').find().toArray(function (err, docs) {
        cb(err, docs);
    })
}

exports.findById = function (id, cb) {
    db.get().collection('numbers').findOne({ _id: ObjectID(id) }, function (err, doc) {
        cb(err, doc);
    })
}

exports.create = function (number, cb) {
    db.get().collection('numbers').insert(number, function (err, result){
        cb(err, result);
    })
}

// exports.update = function (id, newData, cb) {
//     db.get().collection('numbers').updateOne(
//         { _id: ObjectID(id) },
//         newData,
//         function (err, result) {
//             cb(err, result);
//         }
//     )
// }

exports.delete = function (id, cb) {
    db.get().collection('numbers').deleteOne(
        { _id: ObjectID(id)},
        function (err, result){
            cb(err, result);
        }
    )
}