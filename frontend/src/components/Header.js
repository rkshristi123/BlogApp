import * as React from 'react';
import {AppBar,Tab,Tabs} from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../store';




const Header = () => {
const dispatch = useDispatch()
  const isLoggedIn=useSelector((state)=>state.isLoggedIn)
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [value,setValue]=React.useState(0)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{background:"#800000"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          BlogApp
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {isLoggedIn &&
            <Menu
              id="menu-appbar"
              
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              
                <MenuItem  color="green" onClick={handleCloseNavMenu}>
                 <Link style={{textDecoration: 'none',color:"		#2F4F4F ",fontWeight:"bold"}} to="/blogs">All Blogs</Link>
                 
                 
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
              <Link style={{textDecoration: 'none',color:"	#2F4F4F" ,fontWeight:"bold"}} to="/myblogs">My Blogs</Link>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
              <Link style={{textDecoration: 'none',color:"	#2F4F4F" ,fontWeight:"bold"}} to="/addblogs">Add Blogs</Link>
                </MenuItem>
            </Menu>
              }
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
         BlogApp
          </Typography>
          {isLoggedIn &&
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' ,} }}  >
       
            <Tabs textColor="inherit" value={value} onChange={(e,val)=>setValue(val)}>
          <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
          <Tab  LinkComponent={Link} to="/myblogs"  label="My Blogs"/>
          <Tab  LinkComponent={Link} to="/addblogs"  label="Add Blogs"/>
        </Tabs>
             
         
          </Box>}

          <Box sx={{ flexGrow: 0 }} marginLeft="auto" paddingRight="5%">
            <Tooltip title="Open">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
              <Avatar sx={{ bgcolor: "teal" }}>
           <AccountCircleIcon/>
              </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '35px',fontWeight:"bold"}}
           
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             
              {!isLoggedIn && 
              
              <MenuItem  LinkComponent={Link} to="/auth" onClick={handleCloseUserMenu}   sx={{
                display: "block",
              }}>
             <Link  style={{textDecoration: 'none',color:"	#2F4F4F" ,fontWeight:"bold"}} to="/auth">Login/Signup</Link>
                 
                
                </MenuItem> 
            
                }
                {isLoggedIn &&
                <MenuItem  onClick={handleCloseUserMenu}   sx={{
                display: "block",
              }}>
                   <Link onClick={()=>dispatch(authActions.logout())} style={{textDecoration: 'none',color:"		#2F4F4F" ,fontWeight:"bold"}} to="/auth">Logout</Link>
                
                </MenuItem>
                  }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;







{/* <AppBar position="sticky" sx={{background:" linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,96,1) 35%, rgba(0,212,255,1) 100%)"}}>
    <Toolbar>
        <Typography variant="h4">BlogApp</Typography>
        <Box display="flex" marginLeft="auto" marginRight="auto">
        <Tabs textColor="inherit" value={value} onChange={(e,val)=>setValue(val)}>
          <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
          <Tab  LinkComponent={Link} to="/myblogs"  label="My Blogs"/>
        </Tabs>
        </Box>
        <Box display="flex" marginLeft="auto">
            <Button LinkComponent={Link} to="/auth"  variant="contained" sx={{margin:1,borderRadius:10}}  color="warning" >Login</Button>
            <Button LinkComponent={Link} to="/auth"  variant="contained" sx={{margin:1,borderRadius:10}}  color="warning">Signup</Button>
            <Button LinkComponent={Link} to="/auth"  variant="contained" sx={{margin:1,borderRadius:10}}  color="warning">Logout</Button>
        </Box>
    </Toolbar>
</AppBar> */}