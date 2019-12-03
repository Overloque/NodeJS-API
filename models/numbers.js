const { ObjectID } = require('mongodb');
const db = require('../db');
const collection = db.get().collection('numbers');

exports.all = (callback) => {
    collection.find().toArray(callback);
}

exports.findById = (id, cb) => {
    collection.findOne({ _id: ObjectID(id) }, cb);
}

exports.create = (number, cb) => {
    collection.insert(number, cb);
}

exports.delete = (id, cb) => {
    collection.deleteOne({ _id: ObjectID(id) }, cb);
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