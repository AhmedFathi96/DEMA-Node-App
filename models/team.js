const mongoose = require('mongoose');


const team = mongoose.Schema({
    team_img:{
        type: Buffer 
    },
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },

    
}, {timestamps: true})


mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Team = mongoose.model('team' , team);
module.exports = Team;