const mongoose = require('mongoose');


const url = 'mongodb+srv://AhmedFathi96:271996Ahmed@cluster0.bg1zo.mongodb.net/<dbname>?retryWrites=true&w=majority';

const Connect = async ()=>{
    await mongoose.connect(url ,
        {
            useNewUrlParser:true,
            useUnifiedTopology: true
        });
    console.log('DB Successfully Connected');
}

module.exports = Connect;