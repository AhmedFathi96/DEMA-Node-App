const mongoose = require('mongoose');

const item = mongoose.Schema({
    arabic_name:{
        type: String,
        required: true
    },
    english_name:{
        type: String,
        required: true
    },
    arabic_mini_description:{
        type: String,
        required: true
    },
    english_mini_description:{
        type: String,
        required: true
    },
    arabic_full_description:{
        type: String,
        required: true
    },
    english_full_description:{
        type: String,
        required: true
    },
    price_before_discount:{
        type: String,
        required: true
    },
    price_after_discount:{
        type: String,
        required: false
    },
    discount_percentage:{
        type: String,
        required: false
    },

    color:[
        {type: mongoose.Schema.Types.ObjectId, ref: 'color'}
    ],
    size:[
        {type: mongoose.Schema.Types.ObjectId , ref:'size'}
    ],
    collections:[
        {type: mongoose.Schema.Types.ObjectId , ref: 'collections'}
    ],
    category:[
        {type: mongoose.Schema.Types.ObjectId , ref: 'category'}
    ],
    tag: [
        {type: mongoose.Schema.Types.ObjectId , ref: 'tag'}
    ],

    
}, {timestamps: true})



mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Item = mongoose.model('item' , item);
module.exports = Item   ;