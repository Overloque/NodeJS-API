const { ObjectID } = require('mongodb');
const db = require('../db');
const collection = db.get().collection('numbers');

exports.getCars = (offset = 0, callback) => {
    collection.find().skip(offset * 10).limit(10).toArray(callback);
}

exports.getPages = (callback) => {
    return (collection.count().toArray(callback)) / 10;
}

exports.findByNumber = (number) =>{
    return collection.findOne({number: {$eq : number}});
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