const Numbers = require('../models/numbers');
const multer = require('multer');

exports.all = (req, res) => {
    Numbers.all((error, docs) => {
        if (error) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send(docs);
    });
}

exports.findById = (req, res) => {
    Numbers.findById(req.params.id, (error, doc) => {
        if (error) {
            console.log(error);
            return res.sendStatus(500);
        }
        return res.send(doc);
    });
}

exports.create = (req, res) => {
    const { number, name } = req.body;

    if (!number || !name) {
        return res.status(400).end('Missing one or more parameters!');
    }

    Numbers.create({ number, name  }, (error, result) => {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({Status : false}));
        }
        res.send(JSON.stringify({Status : true}));
    });
}

exports.delete = (req, res) => {
    Numbers.delete(req.params.id, (error, result) => {
        if (error) {
            console.log(error);
            return res.send(JSON.stringify({Status : false}));
        }
        return res.send(JSON.stringify({Status : true}));
    });
}

exports.upload = (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.send(JSON.stringify({isComplete: false, msg: err}))
            console.log(req.file);
        } else {
                if(req.file === undefined){
                    res.send(JSON.stringify({isComplete: false, msg: 'Error: No picture Selected!'}));
                    console.log(req.file);          
                }else{
                    res.send(JSON.stringify({isComplete: true, msg: 'Picture uploaded!'}));
                    socket.send(path.resolve(__dirname, `./images/${req.file.filename}`));    
                    console.log(req.file);
                }
            }
    });
};
   