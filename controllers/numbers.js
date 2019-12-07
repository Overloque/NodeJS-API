const Numbers = require('../models/numbers');

exports.all = (req, res) => {
    Numbers.all((error, docs) => {
        if (error) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send(docs);
    });
}

exports.findById = (req, res) => {
    Numbers.findById(req.params.id, (error, doc) => {
        if (error) {
            console.log(error);
            return res.sendStatus(500);
        }
        return res.send(doc);
    });
}

exports.create = (req, res) => {
    const { name, picture } = req.body;

    if (!name || !picture) {
        return res.status(400).end('Missing one or more parameters!');
    }

    Numbers.create({ name, picture }, (error, result) => {
        if (error) {
            console.log(error);
            return res.sendStatus(500);
        }
        return res.send(number);
    });
}

exports.delete = (req, res) => {
    Numbers.delete(req.params.id, (error, result) => {
        if (error) {
            console.log(error);
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    });
}
   