const mongoose = require('mongoose');


const itemImages = mongoose.Schema({
    img:{
        type: Buffer 
    },
    item:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item'
    }
    
}, {timestamps: true})


mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const ItemImages = mongoose.model('itemImages' , itemImages);
module.exports = ItemImages;