const mongoose= require('mongoose')

const TransactionSchema=mongoose.Schema({
    amount:Number,
    transactionDate:Date

})

const CustomerSchema=mongoose.Schema({
    
    fullName: String,
    email:String,
    password:String,
    mobNo:Number ,
    address:String,
    isVerified:Boolean,
    country:String,
    city:String,
    totalAmount:Number,
    credit:[
        TransactionSchema
    
    ],

    debit:[
        TransactionSchema
    ],
},
    {
      timestamps: true
      }
    )
    
    
      

    
module.exports=mongoose.model('Customer',CustomerSchema)
    