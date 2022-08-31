const express=require("express")
const {getAllBlogs,addBlog,updateBlog,getById,deleteblog,getbyuserId} =require("../controller/blog-controller")

const blogrouter=express.Router()

blogrouter.get("/",getAllBlogs)
blogrouter.post("/add",addBlog)
blogrouter.put("/update/:id",updateBlog)
blogrouter.get("/:id",getById)
blogrouter.delete("/:id",deleteblog)
blogrouter.get("/user/:id",getbyuserId)
module.exports= blogrouter
