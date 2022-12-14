import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios"
import {useDispatch} from "react-redux"
import { authActions } from '../store';
import { Navigate, useNavigate } from 'react-router-dom';

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

const Auth = () =>{

  const navigate= useNavigate()
  const dispatch= useDispatch()
const [input, setInput] = React.useState({
  name:"",email:"",password:""
})
  const [issignup,setIssignup]=React.useState(false)

  const handleChange=(e)=>{
    setInput((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }


  const sendRequest=async(type="login")=>{
    
   const res= await axios.post(`http://localhost:5000/api/user/${type}`,{
      name:input.name,
      email:input.email,
      password:input.password
    }).catch(err=>console.log(err))

    const data= await res.data;
    return data;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(input)
    if(issignup){
      sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id))
      .then(()=>dispatch(authActions.login()))
      .then(data=> navigate("/blogs"))
    }else{
      sendRequest().then((data)=>localStorage.setItem("userId",data.user._id))
      .then(()=>dispatch(authActions.login()))
      .then(data=> navigate("/blogs"))
    }
      
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }} >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
         
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
             {issignup? "Signup" : "Login"}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
             {issignup && <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                value={input.name}
                onChange={handleChange}
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />}
               <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                onChange={handleChange}
                value={input.email}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={handleChange}
                value={input.password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="warning"
                sx={{ mt: 3, mb: 2 }}
              >
             Submit
              </Button>
              <Button
           
                fullWidth
                // variant="contained"
                sx={{ mt: 3, mb: 2 }}
               onClick={()=>setIssignup(!issignup)}
              >
            {issignup ? "Change into Login" : "Change into Signup"}
              </Button>
           
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Auth