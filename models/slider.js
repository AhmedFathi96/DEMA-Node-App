const mongoose = require('mongoose');


const slider = mongoose.Schema({
    slider_img:{
        type: Buffer 
    },
    english_header: {
        type: String,
        required: true
    },
    english_sub_header: {
        type: String,
        required: true
    },
    english_content: {
        type: String,
    },

    arabic_header: {
        type: String,
        required: true
    },
    arabic_sub_header: {
        type: String,
        required: true
    },
    arabic_content: {
        type: String,
    },
    order:{
        type: Number,
        required: true
    },
    sale:{
        type: String,
    }
    
}, {timestamps: true})


mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Slider = mongoose.model('slider' , slider);
module.exports = Slider;