const mongoose = require('mongoose');

const itemAdditionalInfo = mongoose.Schema({
    english_name:{
        type: String,
        required: true
    },
    arabic_name:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    item:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item'
    }
    
}, {timestamps: true})



mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const ItemAdditionalInfo = mongoose.model('itemAdditionalInfo' , itemAdditionalInfo);
module.exports = ItemAdditionalInfo;