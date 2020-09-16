const mongoose = require('mongoose');

const size = mongoose.Schema({
    name:{
        type: String,
        required: true
    }
    
}, {timestamps: true})



mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Size = mongoose.model('size' , size);
module.exports = Size;