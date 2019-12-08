const fetch = require('node-fetch');
const { detector } = require('../config');
const Numbers = require('../models/numbers');

exports.getCars = (req, res) => {
    if (req.query.offset === undefined) {
        Numbers.all((error, docs) => {
            if (error) {
                console.log(error);
                return res.status(500).json({status : false});
            }
            return res.send(docs);
        });
    } else {
        // By offset and limit
    }
};

exports.findById = (req, res) => {
    Numbers.findById(req.params.id, (error, doc) => {
        if (error) {
            console.log(error);
            return res.status(500).json({status : false});
        }
        return res.send(doc);
    });
}

exports.create = (req, res) => {
    const { number, name } = req.body;

    if (!number || !name) {
        return res.status(400).end('Недостаточно параметров!');
    }

    Numbers.create({ number, name  }, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({status : false});
        }
        res.json({status : true});
    });
};

exports.delete = (req, res) => {
    Numbers.delete(req.params.id, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({status : false});
        }
        return res.json({status : true});
    });
};

exports.isAllowed = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: false, error: 'Фото машины не найдено!' });      
    }
    fetch(`${detector.url}?path=${encodeURIComponent(req.file.path)}`)
        .then(response => response.json())
        .then(({ points, text }) => {
            if (points && text && text.length) {
                // проверить есть ли номер в бд и разрешен ли проезд...
            } else {
                return res.status(500).json({ status: false, error: 'Номер не распознан!' });
            }
        });
};

function randomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}