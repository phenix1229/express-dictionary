const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
    word:{type:String, unique:true, default:'', lowercase:true},
    definition:{type:String, default:'', lowercase:true}
});

module.exports = mongoose.model('words', WordSchema)