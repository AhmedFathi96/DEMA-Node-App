const express = require('express')
const router  = express.Router();
const auth    = require('../middleware/auth');
const multer  = require('multer');
const category  = require('../models/category'); 
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

router.post('/add-category', auth , upload.single('category_img') ,async(req,res)=>{
    try{
        const buffer = await sharp(req.file.buffer).toBuffer()
        const data = new category({
            category_img:buffer,
            name: req.body.name,
            starting_price: req.body.starting_price
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

router.get('/get-categories', auth , async(req,res)=>{
    
    try{
        const data = await category.find({});
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

router.get('/website-get-categories' , async(req,res)=>{
    
    try{
        const data = await category.find({});
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
router.get('/get-category/:id', auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await category.findById(id);
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


router.get('/get-category-image/:id/view' , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await category.findById(id);
        res.set('Content-type' , 'image/jpg');
        res.send(data.category_img);
    }catch(e){
        res.status(400).send({
            status:'Error',
            status:'Error',
            Error: e
        });
    }
})

router.get('/website-get-category-image/:id/view' , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await category.findById(id);
        res.set('Content-type' , 'image/jpg');
        res.send(data.category_img);
    }catch(e){
        res.status(400).send({
            status:'Error',
            status:'Error',
            Error: e
        });
    }
})

router.put('/update-category/:id', auth , upload.single('category_img'), async (req,res)=>{
    try{
        const id = req.params.id;
        const data = await category.findByIdAndUpdate(
            id, 
            {
                category_img:buffer,
                name: req.body.name,
                starting_price: req.body.starting_price,
            
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

router.delete('/delete-category/:id',auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        console.log('id==>' , id)
        const data = await category.findByIdAndDelete(id);
        if(!data){
            res.status(400).send({
                status:'Error',
                Error: 'can\'t find that category'
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