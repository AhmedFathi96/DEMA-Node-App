const mongoose = require('mongoose');
const jwt      = require('jsonwebtoken');
const validator = require('validator');

const color = mongoose.Schema({
    name:{
        type: String,
        required: true
    }
    
}, {timestamps: true})



mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Color = mongoose.model('color' , color);
module.exports = Color;