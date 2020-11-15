const mongoose = require('mongoose');


const about = mongoose.Schema({
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
        required: true
    },
    english_mission: {
        type: String,
        required: true
    },
    english_mission_content: {
        type: String,
        required: true
    },
    english_vision: {
        type: String,
        required: true
    },
    english_vision_content: {
        type: String,
        required: true
    },
    english_goal: {
        type: String,
        required: true
    },
    english_goal_content: {
        type: String,
        required: true
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
        required: true
    },
    arabic_mission: {
        type: String,
        required: true
    },
    arabic_mission_content: {
        type: String,
        required: true
    },
    arabic_vision: {
        type: String,
        required: true
    },
    arabic_vision_content: {
        type: String,
        required: true
    },
    arabic_goal: {
        type: String,
        required: true
    },
    arabic_goal_content: {
        type: String,
        required: true
    },

}, {timestamps: true})


mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const About = mongoose.model('about' , about);
module.exports = About;