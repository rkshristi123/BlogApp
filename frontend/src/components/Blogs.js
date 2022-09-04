import React, { useEffect, useState } from 'react'
import axios from "axios"
import Blog from './Blog'



const Blogs = () => {

  

 const [blogs,setBlogs] = useState()
const sendRequest = async()=>{
 const res= await axios
 .get("http://localhost:5000/api/blog")
 .catch(err=>console.log(err))
 const data =await res.data
 return data
}


useEffect(()=>{

  sendRequest().then(data=>setBlogs(data.blogs))
},[])

console.log("blogs", blogs)

  return (
    <div>

      {blogs && blogs.map((el,index)=>(
      <Blog 
      id={el._id}
      isUser={localStorage.getItem("userId")===el.user._id}
      key={index} 
      title={el.title} 
      image={el.image} 
      description={el.description}
       userName={el.user.name}/>
      ))}
  
    </div>
  )
}

export default Blogs

