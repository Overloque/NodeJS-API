const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const db = require('./db');
const { port } = require('./config');
const upload = require('./middlewares/upload');

db.connect('mongodb://localhost:27017/numbersDatabase', error => {
    if (error) {
        return console.log(error);
    }

    const numbersController = require('./controllers/numbers');
    const app = express();

    //EJS
    app.set('view engine', 'ejs');

    //Folder for images
    app.use(express.static(path.resolve(__dirname, './images')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : true }));

    app.get('/', (req, res) => res.render('index')); // MAIN PAGE
    app.get('/cars', numbersController.getCars); // GET CARS
    app.get('/cars/:id', numbersController.findById); // FIND CAR
    app.post('/cars/create', numbersController.create); // CREATE CAR
    app.post('/cars/remove/:id', numbersController.delete); // REMOVE CAR
    app.post('/check', upload.single('image'), numbersController.isAllowed); // UPLOAD IMAGE

    app.listen(port, () => console.log(`Server has been started on port ${port}!`));
});