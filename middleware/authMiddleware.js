const verifySecret=(req,res,next)=>{
    const headers = req.headers || {};
    const incomingShippingSecret=headers["shipping_secret_key"];
    const localSecretKey= process.env.SHIPPING_SECRET_KEY
    if(!incomingShippingSecret){
        return res.status(403).json({error:"apiauthkey is missing or invalid."});
    }
    if(incomingShippingSecret !== localSecretKey){
        return res.status(403).json({
            error:"Failed to authenticate SHIPPING_SECRET_KEY"
        });
    }
    next();

    
};
module.exports={verifySecret};