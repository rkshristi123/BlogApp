import  React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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

const Addform=()=> {
    const [input,setInput] =useState({

        title:"",
        description:"",
        image:""
      })

      const handleChange=(e)=>{
        setInput((prevState)=>({
            ...prevState,
            [e.target.name] : e.target.value
          }))
      }
      const id =localStorage.getItem("userId")

      const sendRequest=async(type="login")=>{
     const res= await axios.post(`http://localhost:5000/api/blog/add`,{
           title:input.title,
           description:input.description,
           image:input.image,
           user:id
         }).catch(err=>console.log(err))
     
         const data= await res.data;
         return data;
       }

      const handleSubmit=(e)=>{
        e.preventDefault()
        sendRequest().then((data)=>console.log(data))
     
      }

  return (
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
            <TextField
              margin="normal"
              color="success"
              value={input.title}
              onChange={handleChange}
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
            />
            <TextField
              margin="normal"
              color="success"
              value={input.description}
              onChange={handleChange}
              required
              fullWidth
              name="description"
              label="Discription"
              type="text"
              id="description"
              autoComplete="current-password"
            />
             <TextField
              margin="normal"
              color="success"
              value={input.image}
              onChange={handleChange}
              required
              fullWidth
              name="image"
              label="Image"
              type="text"
              id="image"
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
  );
}

export default Addform