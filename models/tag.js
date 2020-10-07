const mongoose = require('mongoose');

const tag = mongoose.Schema({
    english_name:{
        type: String,
        required: true
    },
    arabic_name:{
        type: String,
        required: true
    }
}, {timestamps: true})



mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Tag = mongoose.model('tag' , tag);
module.exports = Tag;