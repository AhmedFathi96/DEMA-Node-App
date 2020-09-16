const mongoose = require('mongoose');


const about = mongoose.Schema({
    header: {
        type: String,
        required: true
    },
    sub_header: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    mission: {
        type: String,
        required: true
    },
    mission_content: {
        type: String,
        required: true
    },
    vision: {
        type: String,
        required: true
    },
    vision_content: {
        type: String,
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    goal_content: {
        type: String,
        required: true
    },
    

}, {timestamps: true})


mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const About = mongoose.model('about' , about);
module.exports = About;