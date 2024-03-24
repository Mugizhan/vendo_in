const mongoose=require("mongoose")
const DataSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    
});

module.exports=mongoose.model("user",DataSchema);
