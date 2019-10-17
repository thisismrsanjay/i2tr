const express = require('express');
const router = express.Router();
const Window = require('../models/window');
const {ensureAuthenticated}=require('../auth');

router.get('/createWindow',ensureAuthenticated,(req,res)=>{
    const newWindow  = new Window();
    newWindow.save((err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/window/'+data._id);
        }
    })
})

router.get('/tutor',(req,res,next)=>{
    res.render('tutor',{title:'Tutor'})
})
router.get('/window/:id',ensureAuthenticated,(req,res)=>{
    if(req.params.id){
        Window.findOne({_id:req.params.id},(err,data)=>{
            if(err){
                console.log("can't search in database");
                console.log(err);
                res.render('/',{errors:{error:{msg:"can't search in database"}}});
            }else{
                res.render('window',{data:data,windowId:req.params.id})
            }
        })
    }else{
        res.render('/');
    }
})

module.exports = router;