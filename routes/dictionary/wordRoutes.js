const express = require('express');
const router = express.Router();
const Word = require('./models/Words');

router.get('/', (req, res) => {
    return res.send('word router working');
});

router.post('/addword', (req, res) => {
    if(!req.body.word || !req.body.definition){
        return res.status(400).json({message:'All fields must be filled'});
    };
    Word.findOne({word: req.body.word})
    .then(word => {
        if(word){
            return res.status(500).json({message:'Word is already in dictionary'});
        }
        const newWord = new Word();
        newWord.word = req.body.word;
        newWord.definition = req.body.definition;
        newWord.save()
        .then((word) => {
            return res.status(200).json({message: 'Word added', word: word});
        })
        .catch(err => {
            return res.status(500).json({message: 'Word was not created', err});
        })
    })
    .catch(err => {
        return res.status(500).json({message:'Server error', err});
    })
});

module.exports = router;