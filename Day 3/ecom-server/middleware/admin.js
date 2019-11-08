const admin = (req,res,next)=>{
    if(!req.user.isAdmin){
        return res.status(401).json({message:'You dont have authorization'});
    }
    next();
}

module.exports = admin;