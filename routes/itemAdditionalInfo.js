const express = require('express')
const router  = express.Router();
const itemAdditionalInfo   = require('../models/itemAdditionalInfo'); 
const auth    = require('../middleware/auth')
router.post('/create-itemAdditionalInfo', auth , async(req,res)=>{
    
    try{
        const data = new itemAdditionalInfo(req.body);
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

router.post('/first-create-itemAdditionalInfo' , async(req,res)=>{
    
    try{
        const data = new itemAdditionalInfo(req.body);
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

router.get('/get-itemAdditionalInfos', auth , async(req,res)=>{
    
    try{
        const data = await itemAdditionalInfo.find({});
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
router.get('/get-itemAdditionalInfo/:id', auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await itemAdditionalInfo.findById(id);
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

router.put('/update-itemAdditionalInfo/:id', auth , async (req,res)=>{
    try{
        const id = req.params.id;

        const data = await itemAdditionalInfo.findByIdAndUpdate(id, req.body ,{new:true , runValidators:true , useFindAndModify:false})
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

router.delete('/delete-itemAdditionalInfo/:id',auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        console.log('id==>' , id)
        const data = await itemAdditionalInfo.findByIdAndDelete(id);
        if(!data){
            res.status(400).send({
                status:'Error',
                Error: 'can\'t find that itemAdditionalInfo'
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