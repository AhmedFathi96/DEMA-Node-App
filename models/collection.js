const mongoose = require('mongoose');

const collections = mongoose.Schema({
    collection_img:{
        type: Buffer 
    },
    english_name:{
        type: String,
        required: true
    },
    arabic_name:{
        type: String,
        required: true
    },
    english_sub_header:{
        type: String,
        required: true
    },
    arabic_sub_header:{
        type: String,
        required: true
    }
    
}, {timestamps: true})



mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Collections = mongoose.model('collections' , collections);
module.exports = Collections;