const express = require('express')
const router  = express.Router();
const auth    = require('../middleware/auth');
const multer  = require('multer');
const team  = require('../models/team'); 
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

router.post('/add-team', auth , upload.single('team_img') ,async(req,res)=>{
    try{
        const buffer = await sharp(req.file.buffer).toBuffer()
        const data = new team({
            team_img:buffer,
            name: req.body.name,
            position: req.body.position
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

router.get('/get-teams', auth , async(req,res)=>{
    
    try{
        const data = await team.find({});
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

router.get('/website-get-teams' , async(req,res)=>{
    
    try{
        const data = await team.find({});
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
router.get('/get-team/:id', auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await team.findById(id);
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


router.get('/get-team-image/:id/view' , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await team.findById(id);
        res.set('Content-type' , 'image/jpg');
        res.send(data.team_img);
    }catch(e){
        res.status(400).send({
            status:'Error',
            status:'Error',
            Error: e
        });
    }
})

router.get('/website-get-team-image/:id/view' , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await team.findById(id);
        res.set('Content-type' , 'image/jpg');
        res.send(data.team_img);
    }catch(e){
        res.status(400).send({
            status:'Error',
            status:'Error',
            Error: e
        });
    }
})

router.put('/update-team/:id', auth , upload.single('team_img'), async (req,res)=>{
    try{
        const id = req.params.id;
        const data = await team.findByIdAndUpdate(
            id, 
            {
                team_img:buffer,
                name: req.body.name,
                position: req.body.position
            
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

router.delete('/delete-team/:id',auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        console.log('id==>' , id)
        const data = await team.findByIdAndDelete(id);
        if(!data){
            res.status(400).send({
                status:'Error',
                Error: 'can\'t find that team'
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