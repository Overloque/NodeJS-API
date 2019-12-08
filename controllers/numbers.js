const fetch = require('node-fetch');
const { detector } = require('../config');
const Numbers = require('../models/numbers');

exports.getCars = (req, res) => {
    Numbers.getCars(req.query.offset, (error, cars) => {
        if (error) {
            console.log(error);
            return res.status(500).json({status : false});
        }
        return res.json(cars);
    });
}

exports.findById = (req, res) => {
    Numbers.findById(req.params.id, (error, car) => {
        if (error) {
            console.log(error);
            return res.status(500).json({status : false});
        }
        return res.json(car);
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

exports.isAllowed = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: false, error: 'Фото машины не найдено!' });      
    }

    const response = await fetch(`${detector.url}?path=${encodeURIComponent(req.file.path)}`);
    const { points, text } = await response.json();

    if (!points || !text || !text.length || !points.length) {
        return res.status(500).json({ status: false, error: 'Номер не распознан!' });
    }

    const car = await Numbers.findByNumber(text[0]);
    
    if (!car) {
        return res.status(200).json({ status: true, found: false, result: { points, text } });
    } else {
        return res.status(200).json({ status: true, found: true, car, result: { points, text } });
    }
};