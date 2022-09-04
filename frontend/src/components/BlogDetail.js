
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Avatar from '@mui/material/Avatar';
import {InputLabel,Button} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded';
import axios from "axios"
import Link from '@mui/material/Link';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const BlogDetail = () => {

  const [input,setInput] =useState({

   
  })

  const handleChange=(e)=>{
    setInput((prevState)=>({
        ...prevState,
        [e.target.name] : e.target.value
      }))
  }

const [blog,setBlog] =useState()
const navigate =useNavigate()
  const id= useParams().id
  console.log(id)
const fetchDetails=async ()=>{
  const res =await axios.get(`http://localhost:5000/api/blog/${id}`)
  .catch((err)=>console.log(err))
  const data = await res.data
  return data;
}
  useEffect(()=>{
    fetchDetails().then((data)=>{
      setBlog(data.blog)
      setInput({title:data.blog.title,description:data.blog.description})
    })
  },[id])

  const sendRequest= async ()=>{
    const res =axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      title:input.title,
      description:input.description
    }).catch((err)=>{
      console.log(err)
    })
    const data =await res.data
    return data
  }

  console.log(blog)
const handleSubmit=(e)=>{
  e.preventDefault()
  console.log(input)
  sendRequest().then(()=>navigate("/myblogs"))
}


  return (
    <div>
      {input &&
         <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'red' }}>
            <CreateNewFolderRoundedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Blog
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <InputLabel>Title</InputLabel>
            <TextField
              margin="normal"
              color="success"
              value={input.title}
              onChange={handleChange}
              required
              fullWidth
              id="title"
    
              name="title"
              autoFocus
            />
            <InputLabel>Description</InputLabel>
            <TextField
              margin="normal"
              color="success"
              value={input.description}
              onChange={handleChange}
              required
              fullWidth
              name="description"
            
              type="text"
              id="description"
              autoComplete="current-password"
            />
            
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="warning"
            >
             Submit
            </Button>
           
          </Box>
        </Box>
      
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
}
    </div>
  )
}

export default BlogDetail