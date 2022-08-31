const express=require("express")
const mongoose=require("mongoose")
const blogrouter = require("./routes/blog-routes")
const router = require("./routes/user-routes")
const cors =require("cors")

const app=express()
app.use(cors())
app.use(express.json())

app.use("/api/user",router)
app.use("/api/blog",blogrouter)
mongoose.connect(
    "mongodb+srv://shristi:shristi123@cluster0.imvho.mongodb.net/blog?retryWrites=true&w=majority"
).then(()=>app.listen(5000)).then(()=>
console.log("connected port 5000")
).catch((err)=>console.log(err))