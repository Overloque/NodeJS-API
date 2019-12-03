var express = require ('express');
var bodyParser = require ('body-parser');
var db = require('./db');
var numbersController = require('./controllers/numbers');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function(req, res){
    res.send('Hello API');
})

app.get('/numbers', numbersController.all);

app.get('/numbers/:id', numbersController.findById);

app.post('/numbers', numbersController.create);

//app.put('/numbers/:id', numbersController.update);

app.delete('/numbers/:id', numbersController.delete);

db.connect('mongodb://localhost:27017/numbersDatabase', function (err) {
    if(err){
        return console.log(err);
    }
    app.listen(3012, function() {
    console.log('API app started');
    })
})