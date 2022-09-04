const Blog =require("../model/Blog")
const User=require("../model/User")
const mongoose=require("mongoose")
const getAllBlogs =async(req,res,next)=>{
    let blogs
    try{
        blogs= await Blog.find().populate("user")
    }catch(err){
        return console.log(err)
    }
    if(!blogs){
        return res.status(404).json({message:"No Blogs"})
    }
    return res.status(200).json({blogs})
}


const addBlog=async(req,res,next)=>{
    const{title,description,image,user}=req.body;
    let existinguser
    try{
        existinguser=await User.findById(user)
    }catch(err){
        console.log(err)
    }
    if(!existinguser){
        return res.status(400).json({message:"unable to find user by this id"})
    }
    const blog=new Blog({
        title,description,image,user
    })
    try{
       const session=await mongoose.startSession()
       session.startTransaction()
       await blog.save({session})
       existinguser.blogs.push(blog)
       await existinguser.save({session})
       await session.commitTransaction()

    }catch(err){
        return console.log(err)
        return res.status(500).json({message:err})
    }
    return res.status(200).json({blog})
}


const updateBlog=async(req,res,next)=>{
    const {title,description}=req.body;
    const blogId=req.params.id;

    let blog
    try{
        blog=await Blog.findByIdAndUpdate(blogId,{
            title,
            description
        })
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(500).json({message:"unable to update blog"})
    }
    return res.status(200).json({blog})
}

 const getById=async(req,res,next)=>{
    const id=req.params.id;
    let blog;
    try{
        blog=await Blog.findById(id)
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(404).json({message:"No Blog Found"})
    }
    return res.status(200).json({blog})
 }

 const deleteblog=async(req,res,next)=>{
    const id=req.params.id

    let blog
    try{
        blog=await Blog.findByIdAndRemove(id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save()
    }catch(err){
        console.log(err)
    }
    if(!blog){
        return res.status(500).json({message:"Unable to Delete the blog"})
    }
    return res.status(200).json({message:"successfully deleted"})
 }


 const getbyuserId=async(req,res,next)=>{
    const userId=req.params.id;
    let userBlogs;
    try{
        userBlogs=await User.findById(userId).populate("blogs")
    }
    catch(err){
        return console.log(err)
    }
    if(!userBlogs){
        return res.status(404).json({message:"No Blog Found"})
    }
    return res.status(200).json({blogs:userBlogs})
 }


module.exports= {getAllBlogs,addBlog,updateBlog,getById,deleteblog,getbyuserId}