import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import {Routes,Route, useNavigate} from "react-router-dom"
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/Home";
import { useEffect } from "react";
import { authActions } from "./store";


function App() {
  const isLoggedIn=useSelector((state)=>state.isLoggedIn)
  const dispatch=useDispatch()
  console.log(isLoggedIn)

  useEffect(()=>{
    if(localStorage.getItem("userId")){
  dispatch(authActions.login())
    }
  },[dispatch])
  return (
    <>
    <header>
    <Header/>
    </header>
    <main>
      <Routes>
     {!isLoggedIn ?
            <Route path="/auth" element={<Auth/>}/>
      :
     <>
      <Route path="/" element={<Home/>}/>
       <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/addblogs" element={<AddBlog/>}/>
        <Route path="/myblogs" element={<UserBlogs/>}/>
        <Route path="/myblogs/:id" element={<BlogDetail/>}/>

       </>
     }
      </Routes>
    </main>
    </>
  
  );
}

export default App;
