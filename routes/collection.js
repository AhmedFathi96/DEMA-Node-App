const express = require('express')
const router  = express.Router();
const collection   = require('../models/collection'); 
const auth    = require('../middleware/auth')
router.post('/create-collection', auth , async(req,res)=>{
    
    try{
        const data = new collection(req.body);
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

router.post('/first-create-collection' , async(req,res)=>{
    
    try{
        const data = new collection(req.body);
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

router.get('/get-collections', auth , async(req,res)=>{
    
    try{
        const data = await collection.find({});
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
        const data = await collection.findById(id);
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

router.put('/update-collection/:id', auth , async (req,res)=>{
    try{
        const id = req.params.id;
        const updates = Object.keys(req.body)
        const allowed_updates = ['name' , 'password' , 'email' , 'role'];
        const is_valid = updates.every((up)=>{allowed_updates.includes(up)});
        console.log('===>' , updates , is_valid)
        if(is_valid){
            res.status(400).send('Invalid property');
        }
        const data = await collection.findByIdAndUpdate(id, req.body ,{new:true , runValidators:true , useFindAndModify:false})
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
        const data = await collection.findByIdAndDelete(id);
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