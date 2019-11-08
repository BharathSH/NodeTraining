const jwt = require('jsonwebtoken');
const secretKey = "KEY";

const auth =(req,res,next)=>{
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({message: 'token is missing'});
    }

    try{
        const payload = jwt.verify(token,secretKey);
        req.user = payload;
        next();
    }catch(e){
        return res.status(401).json({error: 'invalid token'});
    }

};

module.exports= auth;