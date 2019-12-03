const { MongoClient } = require('mongodb');

let db = null;

exports.connect = (url, done) => {
    if (db) {
        return done();
    }
    MongoClient.connect(url, (error, db) => {
        if (error) {
            return done(error);
        }
        db = db.db('numbersDatabase');
        done();
    });
};

exports.get = () => {
    if (!db) {
        throw new Error('The database is not initialized!');
    }
    return db;
};