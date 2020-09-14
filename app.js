const express= require("express")

const mongoose=require("mongoose")

const bodyParser=require('body-parser')

var port=process.env.PORT || 3000;

require('dotenv/config');
const app=express()


app.use(bodyParser.json())


const Customer=require('./routes/Customer')
app.use('/customer',Customer)


const Banker=require('./routes/Banker')
app.use('/banker',Banker)


mongoose.connect(process.env.DB_CONNECTION,
{useNewUrlParser:true,useUnifiedTopology: true},()=>
console.log("DB Connected")
);


app.get('/',async (req,res)=>{
 res.send({'message':'open the app'})   
})

app.listen(port)




//DB_CONNECTION=mongodb+srv://naman03:naman5@1995@cluster0-9h8rr.mongodb.net/test?retryWrites=true&w=majority

