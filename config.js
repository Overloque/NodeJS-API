const path = require('path');

module.exports = {
    port: 3012,
    imageStorage: path.resolve(__dirname, './storage/images'),
    detector: {
        url: 'http://localhost:8765'
    }
};