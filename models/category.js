const mongoose = require('mongoose');


const category = mongoose.Schema({
    category_img:{
        type: Buffer 
    },
    name: {
        type: String,
        required: true
    },
    starting_price: {
        type: String,
        required: true
    },

    
}, {timestamps: true})


mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Category = mongoose.model('category' , category);
module.exports = Category;