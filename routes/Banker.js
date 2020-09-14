const express= require('express')

const router=express.Router();
const Banker=require('../modules/BankerSchema')
const bcrypt=require('bcrypt') ;
const jwt=require('jsonwebtoken')
const validToken=require('../helper')
const Customer=require('../modules/CustomerSchema')



router.post('/bankerRegistration',async (req,res)=>{


    try{
       
    const emailExist=await Banker.findOne({email:req.body.email})
    if(emailExist) return res.status(200).send({"code":0,'message':'User Already exists! Please log in'})
    
    const hashPassword=await bcrypt.hash(req.body.password,10);
    
       
    const user= new Banker({
    fullName:req.body.fullName,
    email:req.body.email,
    password:hashPassword,
    isVerified:true
    });
    
    const saveUser=await user.save();
        
    //const emailToken=jwt.sign({_id:saveUser._id},process.env.TOKEN_SECRET)
    
    res.status(200).json({"code":3,"message":"Registration Successful"})

    
    }catch(err){
    
        res.json({message:err});
    }
    
    });
    
    router.post('/bankerLogin',async (req,res)=>{

    
        try{
        const user=await Banker.findOne({email:req.body.email})
        
        if(!user) return res.status(200).send({"code":0,"message":'User not found. Kindly register'})
        
        const validPass=await bcrypt.compare(req.body.password,user.password);
    
        if(!validPass) return res.status(200).send({"code":2,"message":"Username and Password is not valid. Kindly enter again"})
    
        
        const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
        res.status(200).send({"code":3,'token':token})
        }
        catch(err){
            res.json({message:err});
        }
        });


        router.get('/getAllTransactions/',validToken,async (req,res)=>{

            try{
    
            const customerDetails=await Customer.find()
            
            res.send(customerDetails)
            
            }catch(err){
            
                res.json({message:err});
            }
                
            });
        
        
            router.get('/getTransactions/:customerId',validToken,async (req,res)=>{

                try{
        
                const customerDetails=await Customer.findById(req.params.customerId)
                
                res.send(customerDetails)
                
                }catch(err){
                
                    res.json({message:err});
                }
                    
                });
            


   module.exports=router