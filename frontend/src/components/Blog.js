import  React  from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import {Box,Typography} from '@mui/material';
import { red } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Blog=({title,description,image,userName,isUser,id}) => {
 console.log(title, isUser)

const navigate  = useNavigate()

  const handleEdit=()=>{
    navigate(`/myblogs/${id}`)
  }

  const handleDelete=()=>{
    
  }


  return (
    <div style={{marginTop:"30px"}}>
    <Card   sx={{ width: {md:"40%",xs:"100%"},margin:"auto",mt:"20",padding:"2",boxShadow:"10 px 10px 10px #ccc",":hover":{
     boxShadow:"10px 10px 20px #ccc"
    } }}>
      {isUser && (
        <Box display="flex"  justifyContent="right">
          <IconButton  onClick={handleDelete}><DeleteIcon/></IconButton>
          <IconButton  onClick={handleEdit}><ModeEditOutlineIcon/></IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {userName}
          </Avatar>
        }
       
        title={title}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="250"
        image={image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        <b>{userName}</b> : {description}
        </Typography>
      </CardContent>
    
    </Card>
    </div>
  );
}

export default Blog