const express = require('express')
const router  = express.Router();
const color   = require('../models/color'); 
const auth    = require('../middleware/auth')
router.post('/create-color', auth , async(req,res)=>{
    
    try{
        const data = new color(req.body);
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

router.post('/first-create-color' , async(req,res)=>{
    
    try{
        const data = new color(req.body);
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

router.get('/get-colors', auth , async(req,res)=>{
    
    try{
        const data = await color.find({});
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
router.get('/get-color/:id', auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await color.findById(id);
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

router.put('/update-color/:id', auth , async (req,res)=>{
    try{
        const id = req.params.id;
        const updates = Object.keys(req.body)
        const allowed_updates = ['name' , 'password' , 'email' , 'role'];
        const is_valid = updates.every((up)=>{allowed_updates.includes(up)});
        console.log('===>' , updates , is_valid)
        if(is_valid){
            res.status(400).send('Invalid property');
        }
        const data = await color.findByIdAndUpdate(id, req.body ,{new:true , runValidators:true , useFindAndModify:false})
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

router.delete('/delete-color/:id',auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        console.log('id==>' , id)
        const data = await color.findByIdAndDelete(id);
        if(!data){
            res.status(400).send({
                status:'Error',
                Error: 'can\'t find that color'
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