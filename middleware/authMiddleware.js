const verifySecret=(req,res,next)=>{
    const incomingShippingSecret=req.headers["SHIPPING_SECRET_KEY"];
    const localSecretKey= process.env.SHIPPING_SECRET_KEY
    if(!incomingShippingSecret){
        return res.status(403).json({error:"SHIPPING_SECRET_KEY is missing or invalid."});
    }
    if(incomingShippingSecret !== localSecretKey){
        return res.status(403).json({
            error:"Failed to authenticate SHIPPING_SECRET_KEY"
        });
    }
    next()
};
module.exports={verifySecret};