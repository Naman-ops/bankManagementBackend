const express= require('express')

const router=express.Router();
const Customer=require('../modules/CustomerSchema')
const bcrypt=require('bcrypt') ;
const jwt=require('jsonwebtoken')
const validToken=require('../helper')



router.post('/customerRegistration',async (req,res)=>{


    try{
       
    const emailExist=await Customer.findOne({email:req.body.email})
    if(emailExist) return res.status(200).send({"code":0,'message':'User Already exists! Please log in'})
    
    const hashPassword=await bcrypt.hash(req.body.password,10);
    
       
    const user= new Customer({
    fullName:req.body.fullName,
    email:req.body.email,
    password:hashPassword,
    isVerified:true
    });
    
    const saveUser=await user.save();
        
    
    res.status(200).json({"code":3,"message":"You have registered successfully"})

    
    }catch(err){
    
        res.json({message:err});
    }
    
    });
    
    router.post('/customerLogin',async (req,res)=>{

    
        try{
        const user=await Customer.findOne({email:req.body.email})
        
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

        

   
        router.patch('/customerTransaction',validToken,async(req,res)=>{

            try{
                console.log(req.user._id)

                const user=await Customer.findById(req.user._id)


                var type=req.body.type
                var amount=req.body.amount


                if(!user.totalAmount)
                {
                    var totalAmount=0

                }

                else
                {
                 var totalAmount=user.totalAmount

                }


                if(type=="DEBIT"){
                    

                    user.debit.push({"amount":amount,"transactionDate":Date.now()})

                    
                    if((totalAmount-amount)>0)
                    {
                    totalAmount=totalAmount-amount
                    }

                    else
                    {
                        
                        res.json({"message":"You don't have sufficient balance"})
                    }

                }

                else{
                   user.credit.push({"amount":amount,"transactionDate":Date.now()})
                   totalAmount=totalAmount+amount

                }

                user.totalAmount=totalAmount


                await user.save()
            
                
                res.json({"code":3,"message":"Thanks for transaction with us","totalAmount":totalAmount}) ;
            
            }catch(err){
            
                res.json({message:err})
            }
            
            })


            router.get('/getTransactions/',validToken,async (req,res)=>{

                try{
        
                const customerDetails=await Customer.findById({_id:req.user._id})
                if(!customerDetails.totalAmount){
                    res.send({'debit':customerDetails.debit,'credit':customerDetails.credit,"totalAmount":customerDetails.totalAmount})
                    
                }
                res.send({'debit':customerDetails.debit,'credit':customerDetails.credit,"totalAmount":customerDetails.totalAmount})
                
                }catch(err){
                
                    res.json({message:err});
                }
                    
                });
            
        
    

        


   module.exports=router