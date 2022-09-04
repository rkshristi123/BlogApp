import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import {Routes,Route, useNavigate} from "react-router-dom"
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { useSelector } from "react-redux";
import Home from "./components/Home";


function App() {
  const isLoggedIn=useSelector((state)=>state.isLoggedIn)
  
  console.log(isLoggedIn)
  return (
    <>
    <header>
    <Header/>
    </header>
    <main>
      <Routes>
     
      <Route path="/" element={<Home/>}/>
       <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/addblogs" element={<AddBlog/>}/>
        <Route path="/myblogs" element={<UserBlogs/>}/>
        <Route path="/myblogs/:id" element={<BlogDetail/>}/>
       <Route path="/auth" element={<Auth/>}/>
        
      </Routes>
    </main>
    </>
  
  );
}

export default App;
