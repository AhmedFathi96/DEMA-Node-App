const express = require('express')
const router  = express.Router();
const auth    = require('../middleware/auth');
const multer  = require('multer');
const itemImages  = require('../models/itemImages'); 
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

router.post('/add-itemImage', auth , upload.single('img') ,async(req,res)=>{
    try{
        const buffer = await sharp(req.file.buffer).toBuffer()
        const data = new itemImages({
            img:buffer,
            item: req.body.item
        })

        await data.save();
        res.status(200).send({
            status:'success',
            data: data._id
        });
    }catch(e){
        res.status(400).send({
            status:'Error',
            Error: e
        });
    }
})

router.get('/get-itemImages', auth , async(req,res)=>{
    
    try{
        const data = await itemImages.find({});
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

router.get('/item/:item_id/image/:id/view' , async(req,res)=>{
    try{
        const item_id = req.params.item_id;
        const id = req.params.id;
        const data = await itemImages.find({item: item_id , _id:id});
        res.set('Content-type' , 'image/jpg');
        res.send(data[0].img);
    }catch(e){
        res.status(400).send({
            status:'Error',
            status:'Error',
            Error: e
        });
    }
})

router.get('/get-itemImages/:id' ,async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await itemImages.find({item: id});
        res.status(200).send({
            status:'success',
            data:data.map(item=> item._id)
        });
    }catch(e){
        res.status(400).send({
            status:'Error',
            Error: e
        });
    }
})

router.get('/website-get-itemImages/:id' ,async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await itemImages.find({item: id});
        res.status(200).send({
            status:'success',
            data:data.map(item=> item._id)
        });
    }catch(e){
        res.status(400).send({
            status:'Error',
            Error: e
        });
    }
})

router.get('/get-itemImages-image/:id/view' , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await itemImages.findById(id);
        res.set('Content-type' , 'image/jpg');
        res.send(data.img);
    }catch(e){
        res.status(400).send({
            status:'Error',
            status:'Error',
            Error: e
        });
    }
})

router.get('/website-get-itemImages-image/:id/view' , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await itemImages.findById(id);
        res.set('Content-type' , 'image/jpg');
        res.send(data.img);
    }catch(e){
        res.status(400).send({
            status:'Error',
            status:'Error',
            Error: e
        });
    }
})

router.put('/update-itemImages/:id', auth , upload.single('img'), async (req,res)=>{
    try{
        const id = req.params.id;
        // const newData = new itemImages({itemImages_img:buffer,caption: req.body.caption})
        console.log(req.body)
        const data = await itemImages.findByIdAndUpdate(
            id, 
            {
                img:req.file.buffer,
                item: req.body.item
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
            data: data._id
        })

    }catch(e){
        res.status(400).send({
            status:'Error',
            Error: e
        });
    }

})

router.delete('/delete-itemImages/:id',auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        console.log('id==>' , id)
        const data = await itemImages.findByIdAndDelete(id);
        if(!data){
            res.status(400).send({
                status:'Error',
                Error: 'can\'t find that itemImages'
            });
        }
        res.status(200).send({
            status:'success',
            data:data._id
        });
    }catch(e){
        res.status(400).send({
            status:'Error',
            Error: e
        });
    }
})
module.exports = router;