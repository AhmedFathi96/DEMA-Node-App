const mongoose = require('mongoose');


const brand = mongoose.Schema({
    brand_img:{
        type: Buffer 
    },
    name: {
        type: String,
        required: true
    },


    
}, {timestamps: true})


mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Brand = mongoose.model('brand' , brand);
module.exports = Brand;