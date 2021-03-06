const mongoose = require('mongoose');

const color = mongoose.Schema({
    english_name:{
        type: String,
        required: true
    },
    arabic_name:{
        type: String,
        required: true
    },
    value:{
        type: String,
        required: true
    }
    
}, {timestamps: true})



mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Color = mongoose.model('color' , color);
module.exports = Color;