const mongoose= require('mongoose')


const BankerSchema=mongoose.Schema({
    
    fullName: String,
    email:String,
    password:String,
    mobNo:Number ,
    address:String,
    isVerified:Boolean,
    country:String,
    city:String
},
    {
      timestamps: true
      }
    )
    
    
      
    
module.exports=mongoose.model('Banker',BankerSchema)
    