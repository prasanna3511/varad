import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import  templogo from '../Images/templogo.png'

export default function DenseAppBar(props) {
  return (
    <Box sx={{ flex:1  }}>
      <AppBar position="static" sx={{backgroundColor:'#FF6B35'}}>
        <Toolbar  >
          {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton> */}
          <img src={templogo} style={{height: '100%', width: 100, marginRight:10 }}/>
          <Typography variant="h6" color="inherit" component="div">
            {props.name}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}