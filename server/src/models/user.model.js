const mongoose = require("mongoose");
const bcrypt=require("bcrypt");
const jwt= require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim: true
    },
    lastName:{
        type:String,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true
    },
    password:{
        type:String,
        required:true,
        trim: true
    },
    isAdmin:{
        type:String,
        enum:["false","true"],
        default:"false"
    }
},{
    timestamps:true
})


// password hashing
userSchema.pre("save",  function(){
    this.password= bcrypt.hashSync(this.password,10);
})

// generate jwt token
userSchema.methods.generateToken =  async function(){
 try {
const userDetails={id: this._id,firstName:this.firstName,isAdmin:this.isAdmin}
  const token= await jwt.sign(userDetails,process.env.JWT_SECRET_KEY);
  return token;
 } catch (error) {
  return error.message;
 }
}

// compare password
userSchema.methods.comparePassword= function (password){
    // console.log(password, this.password)
   return  bcrypt.compareSync(password, this.password);
}



const UserModel= mongoose.model("user",userSchema);

module.exports=UserModel;