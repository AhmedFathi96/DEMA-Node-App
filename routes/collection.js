const express = require('express')
const router  = express.Router();
const auth    = require('../middleware/auth');
const multer  = require('multer');
const collections  = require('../models/collection'); 
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

router.post('/add-collection', auth , upload.single('collection_img') ,async(req,res)=>{
    try{
        const buffer = await sharp(req.file.buffer).toBuffer()
        const data = new collections({
            collection_img:buffer,
            english_name: req.body.english_name,
            arabic_name: req.body.arabic_name,
            english_sub_header: req.body.english_sub_header,
            arabic_sub_header: req.body.arabic_sub_header,
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

router.get('/get-collections', auth , async(req,res)=>{
    
    try{
        const data = await collections.find({});
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

router.get('/website-get-collections' , async(req,res)=>{
    
    try{
        const data = await collections.find({});
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
router.get('/get-collection/:id', auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await collections.findById(id);
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


router.get('/get-collection-image/:id/view' , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await collections.findById(id);
        res.set('Content-type' , 'image/jpg');
        res.send(data.collection_img);
    }catch(e){
        res.status(400).send({
            status:'Error',
            status:'Error',
            Error: e
        });
    }
})

router.get('/website-get-collection-image/:id/view' , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await collections.findById(id);
        res.set('Content-type' , 'image/jpg');
        res.send(data.collection_img);
    }catch(e){
        res.status(400).send({
            status:'Error',
            status:'Error',
            Error: e
        });
    }
})

router.put('/update-collection/:id', auth , upload.single('collection_img'), async (req,res)=>{
    try{
        const id = req.params.id;
        const data = await collections.findByIdAndUpdate(
            id, 
            {
                collection_img:req.file.buffer,
                english_name: req.body.english_name,
                arabic_name: req.body.arabic_name,
                english_sub_header: req.body.english_sub_header,
                arabic_sub_header: req.body.arabic_sub_header,
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

router.delete('/delete-collection/:id',auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        console.log('id==>' , id)
        const data = await collections.findByIdAndDelete(id);
        if(!data){
            res.status(400).send({
                status:'Error',
                Error: 'can\'t find that collection'
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