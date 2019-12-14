const { origins } = require('../config');

module.exports = (req, res, next) => {
    if (origins.includes(req.headers.host)) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    }

    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}