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
    const { number, name } = req.body;

    if (!number || !name) {
        return res.status(400).end('Missing one or more parameters!');
    }

    Numbers.create({ number, name  }, (error, result) => {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({Status : false}));
        }
        res.send(JSON.stringify({Status : true}));
    });
}

exports.delete = (req, res) => {
    Numbers.delete(req.params.id, (error, result) => {
        if (error) {
            console.log(error);
            return res.send(JSON.stringify({Status : false}));
        }
        return res.send(JSON.stringify({Status : true}));
    });
}
   