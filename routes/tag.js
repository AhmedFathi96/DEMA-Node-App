const express = require('express')
const router  = express.Router();
const tag   = require('../models/tag'); 
const auth    = require('../middleware/auth')
router.post('/create-tag', auth , async(req,res)=>{
    
    try{
        const data = new tag(req.body);
        console.log(data,req.body);
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

router.post('/first-create-tag' , async(req,res)=>{
    
    try{
        const data = new tag(req.body);
        console.log(data,req.body);
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

router.get('/get-tags', auth , async(req,res)=>{
    
    try{
        const data = await tag.find({});
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
router.get('/get-tag/:id', auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await tag.findById(id);
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

router.put('/update-tag/:id', auth , async (req,res)=>{
    try{
        const id = req.params.id;
        const updates = Object.keys(req.body)
        const allowed_updates = ['name' , 'password' , 'email' , 'role'];
        const is_valid = updates.every((up)=>{allowed_updates.includes(up)});
        console.log('===>' , updates , is_valid)
        if(is_valid){
            res.status(400).send('Invalid property');
        }
        const data = await tag.findByIdAndUpdate(id, req.body ,{new:true , runValidators:true , useFindAndModify:false})
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

router.delete('/delete-tag/:id',auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        console.log('id==>' , id)
        const data = await tag.findByIdAndDelete(id);
        if(!data){
            res.status(400).send({
                status:'Error',
                Error: 'can\'t find that tag'
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