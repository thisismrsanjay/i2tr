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
router.get('/code',(req,res,next)=>{
    res.render('code',{titlel:'Code'})
})
/*
#include <stdio.h>

int main()
{
    printf("Hello World");

    return 0;
}
*/
router.post('/code',(req,res,next)=>{
    let source = {
        source_code: req.body.code,
        language:"c",
        input:""
    };
    let url = `http://api.paiza.io:80/runners/create?source_code=%23include%20%3Cstdio.h%3E%20%20int%20main()%20%7B%20%20%20%20%20printf(%22Hello%20World%22)%3B%20%20%20%20%20%20return%200%3B%20%7D&language=c&api_key=guest`  
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