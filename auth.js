module.exports = {
    ensureAuthenticated : (req,res,next)=>{
        if(req.isAuthenticated()){
            return next();
        }
        res.render('index',{errors:[{msg:"You need to login"}]})
    },   
}