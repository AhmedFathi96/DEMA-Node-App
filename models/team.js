const mongoose = require('mongoose');


const team = mongoose.Schema({
    team_img:{
        type: Buffer 
    },
    arabic_name: {
        type: String,
        required: true
    },
    arabic_job: {
        type: String,
        required: true
    },
    english_name: {
        type: String,
        required: true
    },
    english_job: {
        type: String,
        required: true
    },

    
}, {timestamps: true})


mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Team = mongoose.model('team' , team);
module.exports = Team;