const express = require('express')
const router  = express.Router();
const auth    = require('../middleware/auth');
const multer  = require('multer');
const statistic  = require('../models/statistic'); 
const sharp   = require('sharp')


const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload and image with jpg or jpeg or png extension'))
        }

        cb(undefined , true)
    }
})

router.post('/add-statistic', auth , upload.single('statistic_img') ,async(req,res)=>{
    try{
        const buffer = await sharp(req.file.buffer).toBuffer()
        const data = new statistic({
            statistic_img:buffer,
            count: req.body.count,
            desc: req.body.desc
        })

        await data.save();
        res.status(200).send({
            status:'success',
            data:req.body
        });
    }catch(e){
        res.status(400).send({
            status:'Error',
            Error: e
        });
    }
})

router.get('/get-statistics', auth , async(req,res)=>{
    
    try{
        const data = await statistic.find({});
        res.status(200).send({
            status:'success',
            data:data
        });
    }catch(e){
        res.status(400).send({
            status:'Error',
            Error: e
        });
    }
})

router.get('/website-get-statistics' , async(req,res)=>{
    
    try{
        const data = await statistic.find({});
        res.status(200).send({
            status:'success',
            data:data
        });
    }catch(e){
        res.status(400).send({
            status:'Error',
            Error: e
        });
    }
})
router.get('/get-statistic/:id', auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await statistic.findById(id);
        res.status(200).send({
            status:'success',
            data:data
        });
    }catch(e){
        res.status(400).send({
            status:'Error',
            Error: e
        });
    }
})


router.get('/get-statistic-image/:id/view' , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await statistic.findById(id);
        res.set('Content-type' , 'image/jpg');
        res.send(data.statistic_img);
    }catch(e){
        res.status(400).send({
            status:'Error',
            status:'Error',
            Error: e
        });
    }
})

router.get('/website-get-statistic-image/:id/view' , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await statistic.findById(id);
        res.set('Content-type' , 'image/jpg');
        res.send(data.statistic_img);
    }catch(e){
        res.status(400).send({
            status:'Error',
            status:'Error',
            Error: e
        });
    }
})

router.put('/update-statistic/:id', auth , upload.single('statistic_img'), async (req,res)=>{
    try{
        const id = req.params.id;
        const data = await statistic.findByIdAndUpdate(
            id, 
            {
                statistic_img:buffer,
                count: req.body.count,
                desc: req.body.desc
            
            },
            {new:true , runValidators:true , useFindAndModify:false}
        )
        if(!data){
            return res.status(400).send({
                status:'Error',
                Error: 'Something wrong'
            })
        }
        res.status(200).send({
            status: 'success',
            data: data
        })

    }catch(e){
        res.status(400).send({
            status:'Error',
            Error: e
        });
    }

})

router.delete('/delete-statistic/:id',auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        console.log('id==>' , id)
        const data = await statistic.findByIdAndDelete(id);
        if(!data){
            res.status(400).send({
                status:'Error',
                Error: 'can\'t find that statistic'
            });
        }
        res.status(200).send({
            status:'success',
            data:data
        });
    }catch(e){
        res.status(400).send({
            status:'Error',
            Error: e
        });
    }
})
module.exports = router;