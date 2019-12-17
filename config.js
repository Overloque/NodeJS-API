const path = require('path');

module.exports = {
    port: 3012,
    pageLimit: 10,
    imageStorage: path.resolve(__dirname, './storage/images'),
    detector: {
        url: 'http://localhost:8765'
    },
    origins: [
        '127.0.0.1:3012'
    ]
};