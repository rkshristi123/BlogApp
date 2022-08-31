import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import {Routes,Route} from "react-router-dom"
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { useSelector } from "react-redux";


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
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/blogs/add" element={<AddBlog/>}/>
        <Route path="/myblogs" element={<UserBlogs/>}/>
        <Route path="/myblogs/:id" element={<BlogDetail/>}/>
      </Routes>
    </main>
    </>
  
  );
}

export default App;
