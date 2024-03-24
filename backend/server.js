const express=require("express")
const mongoose=require("mongoose")
const session=require("express-session")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const User=require("./datamodel")

const app=express()
const bodyParser=require("body-parser");
app.use(bodyParser.json(),);





const PORT=process.env.PORT|5000

const cors=require("cors");
app.use(cors({origin:"http://localhost:3000",credintial:true}));


app.post("/post",(request,response)=>{

User.create(request.body)
.then(user=>response.json(user))
.catch((error)=>{
    response.json(error)
})
}
)


const sessions={}
//login
app.post("/login",(request,response)=>{
    
    const {phone,password} =request.body;
    User.findOne({phone:phone})
    .then(user=>{
        if(user){
            if(user.password===password){
                response.json("1")
                

            }
            else{
                response.json("2")
            }
        }
        else{
            response.json("3")
        }
       
        const token=jwt.sign({_id:user.id},process.env.JWT_SECRET,{expiresIn:"7d"});
        User.password=undefined;
        response.json({
            token,
            User,
        })
        
    })


    }
    )

const URI=process.env.MONGO_URI

mongoose.connect(URI).then(()=>{
    console.log("database connected")
    app.listen(PORT,()=>
console.log(`Listening at ${PORT}`)
);
})
.catch((err)=>{
    console.log(err)
})



