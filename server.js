const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const numbersController = require('./controllers/numbers');
const { port } = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.get('/', (req, res) => res.send('Hello API'));
app.get('/numbers', numbersController.all);
app.get('/numbers/:id', numbersController.findById);
app.post('/numbers', numbersController.create);
app.delete('/numbers/:id', numbersController.delete);
//app.put('/numbers/:id', numbersController.update);

db.connect('mongodb://localhost:27017/numbersDatabase', error => {
    if (error) {
        return console.log(err);
    }
    app.listen(port, () => console.log(`Server has been started on port ${port}!`));
});