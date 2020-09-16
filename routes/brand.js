const express = require('express')
const router  = express.Router();
const auth    = require('../middleware/auth');
const multer  = require('multer');
const brand  = require('../models/brand'); 
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

router.post('/add-brand', auth , upload.single('brand_img') ,async(req,res)=>{
    try{
        const buffer = await sharp(req.file.buffer).toBuffer()
        const data = new brand({
            brand_img:buffer,
            name: req.body.name,
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

router.get('/get-brands', auth , async(req,res)=>{
    
    try{
        const data = await brand.find({});
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

router.get('/website-get-brands' , async(req,res)=>{
    
    try{
        const data = await brand.find({});
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
router.get('/get-brand/:id', auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await brand.findById(id);
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


router.get('/get-brand-image/:id/view' , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await brand.findById(id);
        res.set('Content-type' , 'image/jpg');
        res.send(data.brand_img);
    }catch(e){
        res.status(400).send({
            status:'Error',
            status:'Error',
            Error: e
        });
    }
})

router.get('/website-get-brand-image/:id/view' , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await brand.findById(id);
        res.set('Content-type' , 'image/jpg');
        res.send(data.brand_img);
    }catch(e){
        res.status(400).send({
            status:'Error',
            status:'Error',
            Error: e
        });
    }
})

router.put('/update-brand/:id', auth , upload.single('brand_img'), async (req,res)=>{
    try{
        const id = req.params.id;
        const data = await brand.findByIdAndUpdate(
            id, 
            {
                brand_img:buffer,
                name: req.body.name,
            
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

router.delete('/delete-brand/:id',auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        console.log('id==>' , id)
        const data = await brand.findByIdAndDelete(id);
        if(!data){
            res.status(400).send({
                status:'Error',
                Error: 'can\'t find that brand'
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