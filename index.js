const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const { verifySecret } = require('./middleware/authMiddleware');
const { prisma } = require("./db/config");


const app = express();
app.use(express.json());
app.use(verifySecret)

app.post("/api/shipping/create",async(req,res)=>{
  try{
    const {userId,productId,count}=req.body;
    if(!userId || !productId || !count){
      return res.status(404).json({"error": "All fields required"})
    }
    const shipping= await prisma.shipping.create({
      data:{userId,productId,count}
    });
    return res.status(201).json(shipping);
  }
  catch(error){
    console.log(error);
    return res.status(500).json({err:"Internal Sevrer error"})
  }
});

app.put("/api/shipping/cancel",async(req,res)=>{
  try{
    const {shippingId}=req.body;
    if(!shippingId){
      return res.status(404).json({"error": "Missing shippingId" })
    }
    const shipping= await prisma.shipping.update({
      where:{id:shippingId},
      data:{status:"cancelled"},
    });
    return res.status(200).json(shipping);
  }
  catch(error){
    console.log(error);
    return res.status(500).json({err:"Internal Sevrer error"})
  }
});


app.get("/api/shipping/get",async(req,res)=>{
  try{
    const {userId}=req.query;
    if(!userId){
      const shipping= await prisma.shipping.findMany();
      return res.status(200).json(shipping);
    }
    const shipping = await prisma.shipping.findMany({
      where:{userId:parseInt(userId)},
    })
    return res.status(200).json(shipping)
  }
  catch(error){
    console.log(error);
    return res.status(500).json({err:"Internal Server error"})
  }
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 
module.exports = app;
