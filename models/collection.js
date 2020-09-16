const mongoose = require('mongoose');

const collection = mongoose.Schema({
    name:{
        type: String,
        required: true
    }
    
}, {timestamps: true})



mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Collection = mongoose.model('collection' , collection);
module.exports = Collection;