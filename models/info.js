const mongoose = require('mongoose');
const validator = require('validator');
const info = mongoose.Schema({


    email:{
        type: String,
        required: true,
        unique: false,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please Enter correct email')
            }
        }
    },
    phone:{
        type: String,
        required: true
    },
    latitude:{
        type: String,
        required: true
    },
    longitude:{
        type: String,
        required: true
    },
    arabic_submitting_message:{
        type: String,
        required: true
    },
    english_submitting_message:{
        type: String,
        required: true
    },
    arabic_address:{
        type: String,
        required: true
    },
    english_address:{
        type: String,
        required: true
    },
    facebook_url:{                                  // Role could be infoistrator  or supervisor
        type: String,
        required: true,
    },

    twitter_url:{                                  // Role could be infoistrator  or supervisor
        type: String,
        required: true,
    },
    instagram_url:{                                  // Role could be infoistrator  or supervisor
        type: String,
        required: true,
    },
    whatsapp_number:{                                  // Role could be infoistrator  or supervisor
        type: String,
        required: true,
    },
 
    
}, {timestamps: true})




mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Info = mongoose.model('info' , info);
module.exports = Info;