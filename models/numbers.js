const { ObjectID } = require('mongodb');
const db = require('../db');
const { pageLimit } = require('../config');
const collection = db.get().collection('numbers');

exports.getCars = async (number = null, offset = 0) => {
    const query =  { number: new RegExp(`.*${number || ''}.*`, 'ig') };
    const cars = await collection.find(query).skip(offset * pageLimit).limit(pageLimit).toArray();
    const counter = await collection.countDocuments(query);
    const pages = Math.ceil(counter / pageLimit);
    return { cars, pages };
}

exports.findByNumber = (number) => {
    return collection.findOne({number: {$eq: number}});
}

exports.findById = (id) => {
    return collection.findOne({ _id: ObjectID(id) });
}

exports.create = (car) => {
    return collection.insertOne(car);
}

exports.delete = (id) => {
    return collection.deleteOne({ _id: ObjectID(id) });
}