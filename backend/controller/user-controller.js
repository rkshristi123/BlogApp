const User=require("../model/User")
const bcrypt=require("bcryptjs")
const getAllUser= async(req,res,next)=>{
    let users;
    try{
        users=await User.find()
    }catch(err){
        console.log(err)
    }
    if(!users){
        return res.status(404).json({message:"no user found"})
    }
    return res.status(200).json({users})
}

const signup=async (req,res,next)=>{
    const {name,email,password}=req.body
    let  existinguser
    try{
existinguser=await User.findOne({email})
    }catch(err){
       return console.log("err")
    }
    if(existinguser){
        return res.status(400).json({message:"user already exist"})
    }
    const hashedPassword=bcrypt.hashSync(password)
    const user=new User({
        name,
        email,
        password:hashedPassword,
        blogs:[]
    })

    try{
user.save()
    }catch(err){
        console.log(err)
    }
  return  res.status(202).json({user})
}

const login=async (req,res,next)=>{
    const {email,password}=req.body;
    let  existinguser
    try{
existinguser=await User.findOne({email})
    }catch(err){
       return console.log("err")
    }
    if(!existinguser){
        return res.status(404).json({message:"could not find user by this email"})
    }
    const ispasswordcorrect =bcrypt.compareSync(password,existinguser.password)
    if(!ispasswordcorrect){
        return res.status(400).json({message:"Incorrect password"})  
    }
    return res.status(200).json({message:"Login sucessful",user:existinguser})  
}

module.exports= {getAllUser,signup,login}
