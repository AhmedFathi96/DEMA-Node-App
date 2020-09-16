const mongoose = require('mongoose');


const statistic = mongoose.Schema({
    statistic_img:{
        type: Buffer 
    },
    count: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },

    
}, {timestamps: true})


mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Statistic = mongoose.model('statistic' , statistic);
module.exports = Statistic;