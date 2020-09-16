const express = require('express')
const router  = express.Router();
const auth    = require('../middleware/auth');
const about  = require('../models/about'); 


router.post('/create-about', auth  ,async(req,res)=>{
    try{
        const data = new about(req.body)

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

router.get('/get-about', auth , async(req,res)=>{
    
    try{
        const data = await about.find({});
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

router.get('/website-get-about' , async(req,res)=>{
    
    try{
        const data = await about.find({});
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




router.put('/update-about/:id', auth, async (req,res)=>{
    try{
        const id = req.params.id;
        // const newData = new about({about_img:buffer,caption: req.body.caption})
        console.log(req.body)
        const data = await about.findByIdAndUpdate(
            id, req.body,{new:true , runValidators:true , useFindAndModify:false}
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

router.delete('/delete-about/:id',auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await about.findByIdAndDelete(id);
        if(!data){
            res.status(400).send({
                status:'Error',
                Error: 'can\'t find that gallery'
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