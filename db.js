const { MongoClient } = require('mongodb');

let db = null;

exports.connect = (url, done) => {
    if (db) {
        return done();
    }
    MongoClient.connect(url, {useUnifiedTopology: true}, (error, database) => {
        if (error) {
            return done(error);
        }
        db = database.db('numbersDatabase');
        done();
    });
};

exports.get = () => {
    if (!db) {
        throw new Error('The database is not initialized!');
    }
    return db;
};