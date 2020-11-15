const mongoose = require('mongoose');

const badge = mongoose.Schema({
    english_name:{
        type: String,
        required: true
    },
    arabic_name:{
        type: String,
        required: true
    }
    
}, {timestamps: true})



mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Badge = mongoose.model('badge' , badge);
module.exports = Badge;