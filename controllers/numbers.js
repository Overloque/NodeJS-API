const fetch = require('node-fetch');
const { detector } = require('../config');
const Numbers = require('../models/numbers');

exports.getCars = async (req, res) => {
    try {
        const { number, offset } = req.query;
        const result = await Numbers.getCars(number, offset);
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false});
    }
}

exports.findById = async (req, res) => {
    try {
        const car = await Numbers.findById(req.params.id);
        return res.json(car);
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false});
    }
}

exports.findByNumber = async (req, res) => {
    try {
        const car = await Numbers.findByNumber(req.params.number);
        return res.json(car);
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false});
    }
}

exports.create = async (req, res) => {

    const { number, name } = req.body;

    if (!number || !name) {
        return res.status(400).end('Недостаточно параметров!');
    }

    try {
        const car = await Numbers.findByNumber(number);
        if (car) {
            return res.status(400).json({status: false, error: 'Такой номер уже существует в БД!'});
        }
        const result = await Numbers.create({ number, name });
        return res.json({status: Boolean(result.insertedCount)});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false});
    }
};

exports.delete = async (req, res) => {
    try {
        const result = await Numbers.delete(req.params.id);
        return res.json({status: Boolean(result.deletedCount)});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false});
    }
};

exports.isAllowed = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: false, error: 'Фото машины не найдено!' });      
    }

    const response = await fetch(`${detector.url}?path=${encodeURIComponent(req.file.path)}`);
    const { points, text } = await response.json();

    if (!points || !text || !text.length || !points.length) {
        return res.status(200).json({ status: false, error: 'Номер не распознан!' });
    }

    const car = await Numbers.findByNumber(text[0]);
    
    if (!car) {
        return res.status(200).json({ status: true, found: false, result: { points, text } });
    } else {
        return res.status(200).json({ status: true, found: true, car, result: { points, text } });
    }
};