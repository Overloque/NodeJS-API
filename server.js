const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');
const { port } = require('./config');
const ejs = require('ejs');

//Set Storage Engine

const storage = multer.diskStorage({
    destination: './images',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

db.connect('mongodb://localhost:27017/numbersDatabase', error => {
    if (error) {
        return console.log(err);
    }
    const numbersController = require('./controllers/numbers');

    const app = express();

    //EJS
    app.set('view engine', 'ejs');

    // INIT Upload
    const upload = multer({
        storage: storage,
        fileFilter: function (req, file, cb) {
            checkFileType(file, cb)
        }
    }).single('myImage');

    //Check file type
    function checkFileType(file, cb){
        //Allow extensions
        const fileTypes = /jpeg|jpg|png/;
        //Check extension
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if(mimetype && extname){
            return cb(null, true);
        }else{
            cb('Error: Images Only!');
        }
    }

    //Folder for images
    app.use(express.static('./images'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : true }));

    app.get('/numbers?offset', function(req, res){
        if(req.query.offset === undefined)
            numbersController
    })
    app.get('/numbers', (req, res) => res.render('index'));
    app.get('/numbers', numbersController.all);
    app.get('/numbers/:id', numbersController.findById);
    app.post('/numbers', numbersController.create);
    app.post('/numbers/:id', numbersController.delete);

    app.post('/upload', numbersController.upload);
    app.listen(port, () => console.log(`Server has been started on port ${port}!`));
});