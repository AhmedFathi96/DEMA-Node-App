
var express = require('express');
const Connect = require('./controllers/connect');
var cors = require('cors');
var bodyParser = require('body-parser')



const app = express()
const port = process.env.PORT || 6100


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/', (req, res) =>  {
    console.log('data' , req.body)
    res.send(`data ==> ${req.body}`)})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


Connect();




app.get('/', function (req, res) {
    res.send('Hello World!');
});




// import routes
const authRouter        = require('./routes/auth');
const adminRouter       = require('./routes/admin');
const sliderRouter      = require('./routes/slider');
const aboutRouter       = require('./routes/about');
const categoryRouter     = require('./routes/category');
const contactRouter     = require('./routes/contact');
const infoRouter        = require('./routes/info');
const statisticRouter   = require('./routes/statistic');
const teamRouter        = require('./routes/team');
const brandRouter       = require('./routes/brand');

const colorRouter      = require('./routes/color');
const sizeRouter       = require('./routes/size');
const tagRouter        = require('./routes/tag');
const collectionRouter = require('./routes/collection');








// set routes
app.use('/api', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/slider', sliderRouter)
app.use('/api/about', aboutRouter)
app.use('/api/contact', contactRouter)
app.use('/api/info', infoRouter)
app.use('/api/category', categoryRouter)
app.use('/api/statistic', statisticRouter)
app.use('/api/team', teamRouter)
app.use('/api/brand', brandRouter)
app.use('/api/collection', collectionRouter)
app.use('/api/color', colorRouter)
app.use('/api/size', sizeRouter)
app.use('/api/tag',tagRouter)











